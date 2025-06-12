'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'

export default function HomeClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || (language === 'ko' ? '분석 중 오류가 발생했습니다.' : 'An error occurred during analysis.'))
      }

      const data = await response.json()
      // 분석 결과를 URL 파라미터로 전달
      router.push(`/test?data=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : (language === 'ko' ? '알 수 없는 오류가 발생했습니다.' : 'An unknown error occurred.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <section className="text-center py-20 px-4 bg-white mt-6">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          {language === 'ko' ? 'SEO 점수 분석기' : 'SEO Score Analyzer'}
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {language === 'ko'
            ? '웹사이트의 SEO 성능을 분석하고 개선점을 제시하는 최고의 도구입니다.'
            : 'The best tool to analyze your website\'s SEO performance and get improvement suggestions.'}
        </p>
        
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="url"
                id="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={language === 'ko' ? 'https://example.com' : 'https://example.com'}
                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                required
              />
              {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-4 px-6 rounded-full text-lg font-medium transition-colors shadow-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading
                ? language === 'ko' ? '분석 중...' : 'Analyzing...'
                : language === 'ko' ? 'SEO 분석 시작' : 'Start SEO Analysis'}
            </button>
          </form>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            {language === 'ko' ? '분석 항목' : 'Analysis Items'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-md p-8 transform hover:scale-105 transition-transform" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
              <h3 className="text-2xl font-semibold mb-4">
                {language === 'ko' ? '기술적 SEO' : 'Technical SEO'}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '페이지 로딩 속도' : 'Page Loading Speed'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '모바일 최적화' : 'Mobile Optimization'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? 'SSL 인증서' : 'SSL Certificate'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '사이트맵' : 'Sitemap'}
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-md p-8 transform hover:scale-105 transition-transform" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
              <h3 className="text-2xl font-semibold mb-4">
                {language === 'ko' ? '콘텐츠 SEO' : 'Content SEO'}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '메타 태그' : 'Meta Tags'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '제목 구조' : 'Heading Structure'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '이미지 최적화' : 'Image Optimization'}
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {language === 'ko' ? '키워드 사용' : 'Keyword Usage'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 