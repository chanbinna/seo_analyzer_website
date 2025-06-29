import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'SEO 점수 분석기',
  description: '웹사이트의 SEO 점수를 분석하고 개선점을 제시하는 도구입니다.',
  keywords: 'SEO, 분석, 점수, 웹사이트, 최적화',
  openGraph: {
    title: 'SEO 점수 분석기',
    description: '웹사이트의 SEO 점수를 분석하고 개선점을 제시하는 도구입니다.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomeClient />
    </div>
  )
}
