'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
})

interface AnalysisData {
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
        viewport?: string
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
  loadingTime?: number
}

type Language = 'ko' | 'en'

const TEXT: Record<string, Record<Language, string>> = {
  seoResult: {
    ko: 'SEO 분석 결과',
    en: 'SEO Analysis Result',
  },
  overallScore: {
    ko: '전체 SEO 점수',
    en: 'Overall SEO Score',
  },
  technicalSeo: {
    ko: '기술적 SEO 분석',
    en: 'Technical SEO Analysis',
  },
  contentSeo: {
    ko: '콘텐츠 SEO 분석',
    en: 'Content SEO Analysis',
  },
  recommendations: {
    ko: 'SEO 개선 추천사항',
    en: 'SEO Improvement Recommendations',
  },
  copy: {
    ko: '추천사항 복사',
    en: 'Copy Recommendation',
  },
  allOptimized: {
    ko: '모든 주요 항목이 잘 최적화되어 있습니다!',
    en: 'All major items are well optimized!',
  },
  notFound: {
    ko: '분석 데이터를 찾을 수 없습니다.',
    en: 'Analysis data not found.',
  },
  currentStatus: {
    ko: '현재 상태',
    en: 'Current Status',
  },
  recommendedChanges: {
    ko: '추천 변경사항',
    en: 'Recommended Changes',
  },
  score: {
    ko: '점수',
    en: 'Score',
  },
  viewport: {
    ko: 'viewport',
    en: 'viewport',
  },
  none: {
    ko: '없음',
    en: 'None',
  },
  h1: {
    ko: 'H1',
    en: 'H1',
  },
  h2: {
    ko: 'H2',
    en: 'H2',
  },
  h3: {
    ko: 'H3',
    en: 'H3',
  },
  totalImages: {
    ko: '전체 이미지',
    en: 'Total Images',
  },
  withAlt: {
    ko: 'Alt 태그 있는 이미지',
    en: 'Images with Alt Tag',
  },
  optimized: {
    ko: '최적화된 이미지',
    en: 'Optimized Images',
  },
  addAlt: {
    ko: 'Alt 태그 추가',
    en: 'Add Alt Tag',
  },
  optimizeImage: {
    ko: '이미지 최적화',
    en: 'Image Optimization',
  },
  compressImage: {
    ko: '이미지 압축',
    en: 'Image Compression',
  },
  keywordDensity: {
    ko: '키워드 밀도',
    en: 'Keyword Density',
  },
  mainKeywords: {
    ko: '주요 키워드',
    en: 'Main Keywords',
  },
  recommendedKeywords: {
    ko: '추천 키워드',
    en: 'Recommended Keywords',
  },
};

const LABELS: Record<string, Record<Language, string>> = {
  loadingSpeed: { ko: '페이지 로딩 속도', en: 'Page Loading Speed' },
  mobileOptimization: { ko: '모바일 최적화', en: 'Mobile Optimization' },
  sslCertificate: { ko: 'SSL 인증서', en: 'SSL Certificate' },
  sitemap: { ko: '사이트맵', en: 'Sitemap' },
  metaTags: { ko: '메타 태그', en: 'Meta Tags' },
  headingStructure: { ko: '제목 구조', en: 'Heading Structure' },
  imageOptimization: { ko: '이미지 최적화', en: 'Image Optimization' },
  keywordUsage: { ko: '키워드 사용', en: 'Keyword Usage' },
};

const EXPLANATIONS: Record<string, Record<Language, string>> = {
  loadingSpeed: {
    ko: '페이지 로딩 속도는 사용자 경험과 검색엔진 순위에 직접적인 영향을 미칩니다. 3초 이내의 로딩 시간이 권장됩니다.',
    en: 'Page loading speed directly affects user experience and search engine ranking. A loading time under 3 seconds is recommended.',
  },
  mobileOptimization: {
    ko: '모바일 최적화는 모바일 사용자의 경험을 향상시키고, 모바일 검색 결과에서의 순위에 영향을 줍니다.',
    en: 'Mobile optimization improves the experience for mobile users and affects ranking in mobile search results.',
  },
  sslCertificate: {
    ko: 'SSL 인증서는 웹사이트의 보안을 보장하고, 사용자 데이터를 암호화하여 안전하게 전송합니다.',
    en: 'An SSL certificate ensures website security and encrypts user data for safe transmission.',
  },
  sitemap: {
    ko: '사이트맵은 검색엔진이 웹사이트의 구조를 이해하고 모든 페이지를 효율적으로 크롤링하는 데 도움을 줍니다.',
    en: 'A sitemap helps search engines understand your website structure and efficiently crawl all pages.',
  },
  metaTags: {
    ko: '메타 태그는 검색엔진과 사용자에게 웹사이트의 내용을 설명하는 중요한 요소입니다.',
    en: 'Meta tags are important elements that describe your website to search engines and users.',
  },
  headingStructure: {
    ko: '제목 구조는 콘텐츠의 계층을 명확히 하고, 검색엔진이 콘텐츠의 중요도를 이해하는 데 도움을 줍니다.',
    en: 'Heading structure clarifies content hierarchy and helps search engines understand content importance.',
  },
  imageOptimization: {
    ko: '이미지 최적화는 페이지 로딩 속도를 개선하고, 이미지 검색에서의 노출을 높이는 데 중요합니다.',
    en: 'Image optimization improves page loading speed and is important for visibility in image search.',
  },
  keywordUsage: {
    ko: '키워드 사용은 검색엔진이 웹사이트의 주제를 이해하고 관련 검색 결과에 노출시키는 데 중요합니다.',
    en: 'Keyword usage helps search engines understand your website topic and show it in relevant search results.',
  },
};

const RECOMMENDATIONS: Record<string, Record<Language, string>> = {
  loadingSpeed: {
    ko: '이미지 압축, 코드 스플리팅, CDN 활용, 불필요한 JS 제거 등으로 로딩 속도를 개선하세요.',
    en: 'Improve loading speed by compressing images, code splitting, using a CDN, and removing unnecessary JS.',
  },
  mobileOptimization: {
    ko: '반응형 레이아웃 적용, 터치 영역 확대, 뷰포트 메타 태그(예: width=device-width, initial-scale=1) 추가 등 모바일 친화적으로 개선하세요.',
    en: 'Apply responsive layout, enlarge touch areas, and add viewport meta tag (e.g., width=device-width, initial-scale=1) for better mobile friendliness.',
  },
  sslCertificate: {
    ko: 'SSL 인증서를 적용 및 갱신하여 웹사이트의 보안을 강화하세요.',
    en: 'Apply and renew your SSL certificate to enhance website security.',
  },
  sitemap: {
    ko: '사이트맵.xml 파일을 생성하고, robots.txt에 등록하여 검색엔진이 사이트 구조를 쉽게 파악할 수 있도록 하세요.',
    en: 'Create a sitemap.xml file and register it in robots.txt so search engines can easily understand your site structure.',
  },
  metaTags: {
    ko: '메타 태그는 검색엔진과 사용자에게 웹사이트의 주요 정보를 전달하는 중요한 요소입니다. 적절한 제목과 설명을 작성하면 검색 결과에서 더 높은 클릭률을 기대할 수 있습니다.',
    en: 'Meta tags deliver key information about your website to search engines and users. Writing proper titles and descriptions can increase click-through rates in search results.',
  },
  headingStructure: {
    ko: '제목 구조(H1, H2, H3 등)는 콘텐츠의 계층을 명확히 하여 검색엔진이 페이지의 주요 내용을 더 잘 이해할 수 있도록 도와줍니다.',
    en: 'Heading structure (H1, H2, H3, etc.) clarifies content hierarchy and helps search engines better understand your main content.',
  },
  imageOptimization: {
    ko: '- 모든 이미지에 alt 태그 추가 (현재: {withAlt}/{total})\n- 이미지 최적화 적용 (현재: {optimized}/{total})',
    en: '- Add alt tags to all images (current: {withAlt}/{total})\n- Apply image optimization (current: {optimized}/{total})',
  },
  keywordUsage: {
    ko: '키워드 밀도: {density}%\n추천 키워드: {keywords}',
    en: 'Keyword density: {density}%\nRecommended keywords: {keywords}',
  },
};

export default function TestClient() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<AnalysisData | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const { language } = useLanguage() as { language: Language }
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 1
  })

  useEffect(() => {
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam))
        setData(parsedData)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      } catch (error) {
        console.error('Failed to parse data:', error)
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (data) {
      spring.set(0)
      const timer = setTimeout(() => {
        spring.set(data.totalScore)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [data, spring])

  const roundedCount = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const copyToClipboard = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (key) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{TEXT.notFound[language]}</p>
      </div>
    )
  }

  const metaTagsScore = data.details.content.metaTags;
  const headingScore = data.details.content.headingStructure;
  const imageScore = data.details.content.imageOptimization;
  const keywordScore = data.details.content.keywordUsage;
  const needsMeta = metaTagsScore < 90;
  const needsHeading = headingScore < 90;
  const needsImage = imageScore < 90;
  const needsKeyword = keywordScore < 90;

  const loadingSpeedScore = data.details.technical.loadingSpeed;
  const mobileScore = data.details.technical.mobileOptimization;
  const sslScore = data.details.technical.sslCertificate;
  const sitemapScore = data.details.technical.sitemap;
  const needsLoading = loadingSpeedScore < 90;
  const needsMobile = mobileScore < 90;
  const needsSSL = sslScore < 90;
  const needsSitemap = sitemapScore < 90;

  const allOptimized = !needsMeta && !needsHeading && !needsImage && !needsKeyword && !needsLoading && !needsMobile && !needsSSL && !needsSitemap;

  const viewport = data.recommendations?.metaTags?.current?.viewport || '';

  // 1. Gather all needed recommendation cards into an array with their score and type
  const recs = [
    ...(needsLoading ? [{ key: 'loadingSpeed', label: '페이지 로딩 속도', score: loadingSpeedScore }] : []),
    ...(needsMobile ? [{ key: 'mobileOptimization', label: '모바일 최적화', score: mobileScore }] : []),
    ...(needsSSL ? [{ key: 'SSL 인증서', label: 'SSL 인증서', score: sslScore }] : []),
    ...(needsSitemap ? [{ key: '사이트맵', label: '사이트맵', score: sitemapScore }] : []),
    ...(needsMeta ? [{ key: '메타 태그', label: '메타 태그', score: metaTagsScore }] : []),
    ...(needsHeading ? [{ key: '제목 구조', label: '제목 구조', score: headingScore }] : []),
    ...(needsImage ? [{ key: '이미지 최적화', label: '이미지 최적화', score: imageScore }] : []),
    ...(needsKeyword ? [{ key: '키워드 사용', label: '키워드 사용', score: keywordScore }] : []),
  ];
  const sortedRecs = recs.sort((a, b) => a.score - b.score);

  return (
    <main className="min-h-screen py-20 px-4">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{TEXT.seoResult[language]}</h1>
          <p className="text-gray-600 mb-8">{data.url}</p>
          <div className="flex justify-center items-center gap-4">
            <div className="relative">
              <motion.div
                className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div className={`text-4xl font-bold ${
                  (roundedCount.get() >= 90) ? 'text-green-600' :
                  (roundedCount.get() >= 70) ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{roundedCount}</motion.div>
              </motion.div>
              <div className={`bg-gray-200 h-4 rounded-full w-full max-w-md mb-2 mt-3`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.totalScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`${
                    (roundedCount.get() >= 90) ? 'bg-green-600' :
                    (roundedCount.get() >= 70) ? 'bg-yellow-500' :
                    'bg-red-600'
                  } h-4 rounded-full`}
                />
              </div>
              <p className="text-gray-600 mb-4">{TEXT.overallScore[language]}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl shadow-md p-8" style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}>
              <h3 className="text-2xl font-semibold mb-6">{TEXT.technicalSeo[language]}</h3>
              <div className="space-y-6">
                {Object.entries(data.details.technical).map(([key, value], index) => (
                  <div key={key} className="bg-white rounded-xl p-6 border border-gray-100" style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">
                        {(LABELS[key] ? LABELS[key][language] : key)}
                      </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className={`text-lg font-medium ${
                          value >= 90 ? 'text-green-600' :
                          value >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}
                      >
                        {value}/100
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {(EXPLANATIONS[key] ? EXPLANATIONS[key][language] : '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8" style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}>
              <h3 className="text-2xl font-semibold mb-6">{TEXT.contentSeo[language]}</h3>
              <div className="space-y-6">
                {Object.entries(data.details.content).map(([key, value], index) => (
                  <div key={key} className="bg-white rounded-xl p-6 border border-gray-100" style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">
                        {(LABELS[key] ? LABELS[key][language] : key)}
                      </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                        className={`text-lg font-medium ${
                          value >= 90 ? 'text-green-600' :
                          value >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}
                      >
                        {value}/100
                      </motion.span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {(EXPLANATIONS[key] ? EXPLANATIONS[key][language] : '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8" style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}>
            <h3 className="text-2xl font-semibold mb-6">{TEXT.recommendations[language]}</h3>
            <div className="space-y-8">
              {sortedRecs.map((rec, index) => {
                let color = 'text-yellow-600';
                if (rec.score < 70) { color = 'text-red-600'; }
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white rounded-xl p-6 border border-gray-100 ${color}`}
                    style={{ boxShadow: '0 4px 16px 0 rgba(31,38,135,0.06), 0 -4px 12px -4px rgba(31,38,135,0.07)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-semibold">{rec.label}</h4>
                      <button
                        onClick={() => copyToClipboard(
                          RECOMMENDATIONS[rec.key] ? RECOMMENDATIONS[rec.key][language] : '',
                          rec.key
                        )}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 shadow-md transition-transform"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        {TEXT.copy[language]}
                        {copiedKey === rec.key && (
                          <span className="ml-2 text-green-600 text-xs font-semibold">
                            {language === 'ko' ? '복사됨!' : 'Copied!'}
                          </span>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{(EXPLANATIONS[rec.key] ? EXPLANATIONS[rec.key][language] : '')}</p>
                    {rec.key === 'loadingSpeed' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">{TEXT.score[language]}: {loadingSpeedScore}/100</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">{RECOMMENDATIONS.loadingSpeed[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === 'mobileOptimization' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">{TEXT.score[language]}: {mobileScore}/100</p>
                            <p className="text-sm text-gray-600">{TEXT.viewport[language]}: {viewport || TEXT.none[language]}</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">{RECOMMENDATIONS.mobileOptimization[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === 'SSL 인증서' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">{TEXT.score[language]}: {sslScore}/100</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">{RECOMMENDATIONS.sslCertificate[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === '사이트맵' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">{TEXT.score[language]}: {sitemapScore}/100</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">{RECOMMENDATIONS.sitemap[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === '메타 태그' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">{TEXT.score[language]}: {metaTagsScore}/100</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-blue-700">{RECOMMENDATIONS.metaTags[language]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === '제목 구조' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h1[language]}:</span> {data.recommendations.headingStructure.current.h1.join(', ') || TEXT.none[language]}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h2[language]}:</span> {data.recommendations.headingStructure.current.h2.join(', ') || TEXT.none[language]}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h3[language]}:</span> {data.recommendations.headingStructure.current.h3.join(', ') || TEXT.none[language]}</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h1[language]}:</span> {language === 'ko' ? data.recommendations.headingStructure.recommended.h1.join(', ') : 'Main Title'}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h2[language]}:</span> {language === 'ko' ? data.recommendations.headingStructure.recommended.h2.join(', ') : 'Major Section Title 1, Major Section Title 2'}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.h3[language]}:</span> {language === 'ko' ? data.recommendations.headingStructure.recommended.h3.join(', ') : 'Subsection Title 1, Subsection Title 2'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === '이미지 최적화' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.totalImages[language]}:</span> {data.recommendations.images.current.total}개</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.withAlt[language]}:</span> {data.recommendations.images.current.withAlt}개</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.optimized[language]}:</span> {data.recommendations.images.current.optimized}개</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.addAlt[language]}:</span> 모든 이미지에 의미 있는 alt 태그 추가</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.optimizeImage[language]}:</span> WebP 형식 사용 및 적절한 크기로 조정</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.compressImage[language]}:</span> 품질 저하 없이 파일 크기 최적화</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {rec.key === '키워드 사용' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.currentStatus[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.keywordDensity[language]}:</span> {(data.recommendations.keywords.current.density * 100).toFixed(2)}%</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.mainKeywords[language]}:</span> {data.recommendations.keywords.current.mainKeywords.join(', ') || TEXT.none[language]}</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">{TEXT.recommendedChanges[language]}</h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">{TEXT.recommendedKeywords[language]}:</span> {language === 'ko' ? data.recommendations.keywords.recommended.mainKeywords.join(', ') : 'Recommended Keyword 1, Recommended Keyword 2'}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
              {allOptimized && (
                <div className="text-center text-green-600 text-lg font-semibold py-8">
                  {TEXT.allOptimized[language]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 