import { NextResponse } from 'next/server'
import axios from 'axios'
import * as cheerio from 'cheerio'

interface AnalysisResult {
  url: string
  totalScore: number
  technicalScore: number
  contentScore: number
  details: {
    technical: {
      loadingSpeed: number
      mobileOptimization: number
      sslCertificate: number
      sitemap: number
    }
    content: {
      metaTags: number
      headingStructure: number
      imageOptimization: number
      keywordUsage: number
    }
  }
  recommendations: {
    metaTags: {
      current: {
        title: string
        description: string
        viewport: string
      }
      recommended: {
        title: string
        description: string
      }
    }
    headingStructure: {
      current: {
        h1: string[]
        h2: string[]
        h3: string[]
      }
      recommended: {
        h1: string[]
        h2: string[]
        h3: string[]
      }
    }
    images: {
      current: {
        total: number
        withAlt: number
        optimized: number
      }
      recommended: {
        total: number
        withAlt: number
        optimized: number
      }
    }
    keywords: {
      current: {
        density: number
        mainKeywords: string[]
      }
      recommended: {
        density: number
        mainKeywords: string[]
      }
    }
  }
  loadingTime: number
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    // 웹사이트 크롤링
    const startTime = performance.now()
    const response = await axios.get(url)
    const endTime = performance.now()
    const html = response.data
    const $ = cheerio.load(html)

    // 1. Fetch Lighthouse performance score from Google PageSpeed Insights API and use as loadingSpeedScore
    const psiApiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}`;
    let loadingSpeedScore = 85;
    try {
      const psiRes = await axios.get(psiApiUrl);
      loadingSpeedScore = Math.round((psiRes.data.lighthouseResult.categories.performance.score || 0) * 100);
    } catch {
      // fallback to default if API fails
    }

    // 2. For mobile optimization, check for viewport meta tag and mobile-friendly features
    let mobileOptimizationScore = 100;
    const viewport = $('meta[name="viewport"]').attr('content') || '';
    if (!viewport.includes('width=device-width')) mobileOptimizationScore -= 40;
    if (!viewport.includes('initial-scale')) mobileOptimizationScore -= 20;
    if (!/mobile/i.test(viewport)) mobileOptimizationScore -= 20;

    // 3. For SSL, check if url starts with https
    const sslCertificateScore = url.startsWith('https') ? 100 : 0

    // 4. For sitemap, check if /sitemap.xml exists
    let sitemapScore = 100;
    try {
      await axios.get(new URL('/sitemap.xml', url).toString());
    } catch {
      sitemapScore = 0;
    }

    // 메타 태그 분석
    const title = $('title').text() || ''
    const description = $('meta[name="description"]').attr('content') || ''
    const metaTagsScore = calculateMetaTagsScore(title, description)

    // 제목 구조 분석
    const h1Tags = $('h1').map((_, el) => $(el).text()).get()
    const h2Tags = $('h2').map((_, el) => $(el).text()).get()
    const h3Tags = $('h3').map((_, el) => $(el).text()).get()
    const headingStructureScore = calculateHeadingStructureScore(h1Tags, h2Tags, h3Tags)

    // 이미지 분석
    const images = $('img')
    const totalImages = images.length
    const imagesWithAlt = images.filter((_, el) => !!$(el).attr('alt')).length
    const imageOptimizationScore = calculateImageOptimizationScore(totalImages, imagesWithAlt)

    // 키워드 분석
    const bodyText = $('body').text()
    const keywordAnalysis = analyzeKeywords(bodyText)
    const keywordUsageScore = calculateKeywordUsageScore(keywordAnalysis)

    // 점수 계산
    const technicalScore = Math.round(
      (loadingSpeedScore + mobileOptimizationScore + sslCertificateScore + sitemapScore) / 4
    )
    const contentScore = Math.round(
      (metaTagsScore + headingStructureScore + imageOptimizationScore + keywordUsageScore) / 4
    )
    const totalScore = Math.round((technicalScore + contentScore) / 2)

    // 추천사항 생성
    const recommendations = generateRecommendations({
      metaTags: { title, description, viewport },
      headingStructure: { h1: h1Tags, h2: h2Tags, h3: h3Tags },
      images: { total: totalImages, withAlt: imagesWithAlt, optimized: 0 },
      keywords: keywordAnalysis
    })

    const loadingTime = (endTime - startTime) / 1000 // Convert milliseconds to seconds

    const result: AnalysisResult = {
      url,
      totalScore,
      technicalScore,
      contentScore,
      details: {
        technical: {
          loadingSpeed: loadingSpeedScore,
          mobileOptimization: mobileOptimizationScore,
          sslCertificate: sslCertificateScore,
          sitemap: sitemapScore
        },
        content: {
          metaTags: metaTagsScore,
          headingStructure: headingStructureScore,
          imageOptimization: imageOptimizationScore,
          keywordUsage: keywordUsageScore
        }
      },
      recommendations,
      loadingTime
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze website' },
      { status: 500 }
    )
  }
}

function calculateMetaTagsScore(title: string, description: string): number {
  let score = 100

  if (!title) score -= 30
  else if (title.length < 30 || title.length > 60) score -= 15

  if (!description) score -= 30
  else if (description.length < 120 || description.length > 160) score -= 15

  return Math.max(0, score)
}

function calculateHeadingStructureScore(h1: string[], h2: string[], h3: string[]): number {
  let score = 100

  if (h1.length === 0) score -= 30
  else if (h1.length > 1) score -= 15

  if (h2.length === 0) score -= 20
  if (h3.length === 0) score -= 10

  return Math.max(0, score)
}

function calculateImageOptimizationScore(total: number, withAlt: number): number {
  if (total === 0) return 100
  return Math.round((withAlt / total) * 100)
}

function analyzeKeywords(text: string) {
  // 간단한 키워드 분석 (실제로는 더 복잡한 분석 필요)
  const words = text.toLowerCase().split(/\s+/)
  const wordCount = words.length
  const wordFreq: { [key: string]: number } = {}

  words.forEach(word => {
    if (word.length > 3) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }
  })

  const mainKeywords = Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word)

  return {
    density: Object.values(wordFreq).reduce((a, b) => a + b, 0) / wordCount,
    mainKeywords
  }
}

function calculateKeywordUsageScore(keywordAnalysis: { density: number, mainKeywords: string[] }): number {
  let score = 100

  if (keywordAnalysis.density < 0.01) score -= 30
  else if (keywordAnalysis.density > 0.03) score -= 20

  if (keywordAnalysis.mainKeywords.length < 3) score -= 20

  return Math.max(0, score)
}

function generateRecommendations(data: {
  metaTags: { title: string, description: string, viewport: string },
  headingStructure: { h1: string[], h2: string[], h3: string[] },
  images: { total: number, withAlt: number, optimized: number },
  keywords: { density: number, mainKeywords: string[] }
}) {
  return {
    metaTags: {
      current: {
        title: data.metaTags.title,
        description: data.metaTags.description,
        viewport: data.metaTags.viewport
      },
      recommended: {
        title: generateRecommendedTitle(data.metaTags.title),
        description: generateRecommendedDescription(data.metaTags.description)
      }
    },
    headingStructure: {
      current: {
        h1: data.headingStructure.h1,
        h2: data.headingStructure.h2,
        h3: data.headingStructure.h3
      },
      recommended: {
        h1: generateRecommendedH1(data.headingStructure.h1),
        h2: generateRecommendedH2(data.headingStructure.h2),
        h3: generateRecommendedH3(data.headingStructure.h3)
      }
    },
    images: {
      current: {
        total: data.images.total,
        withAlt: data.images.withAlt,
        optimized: data.images.optimized
      },
      recommended: {
        total: data.images.total,
        withAlt: data.images.total,
        optimized: data.images.total
      }
    },
    keywords: {
      current: {
        density: data.keywords.density,
        mainKeywords: data.keywords.mainKeywords
      },
      recommended: {
        density: 0.02,
        mainKeywords: generateRecommendedKeywords(data.keywords.mainKeywords)
      }
    }
  }
}

function generateRecommendedTitle(current: string): string {
  if (!current) return '웹사이트 제목 - 주요 키워드 포함'
  if (current.length < 30) return `${current} - 전문적인 서비스 제공`
  if (current.length > 60) return current.substring(0, 60)
  return current
}

function generateRecommendedDescription(current: string): string {
  if (!current) return '웹사이트에 대한 상세한 설명을 120-160자 내로 작성하세요.'
  if (current.length < 120) return `${current} - 더 자세한 설명을 추가하세요.`
  if (current.length > 160) return current.substring(0, 160)
  return current
}

function generateRecommendedH1(current: string[]): string[] {
  if (current.length === 0) return ['메인 제목']
  if (current.length > 1) return [current[0]]
  return current
}

function generateRecommendedH2(current: string[]): string[] {
  if (current.length === 0) return ['주요 섹션 제목 1', '주요 섹션 제목 2']
  return current
}

function generateRecommendedH3(current: string[]): string[] {
  if (current.length === 0) return ['하위 섹션 제목 1', '하위 섹션 제목 2']
  return current
}

function generateRecommendedKeywords(current: string[]): string[] {
  if (current.length < 3) {
    return [...current, '추천 키워드 1', '추천 키워드 2'].slice(0, 5)
  }
  return current
} 