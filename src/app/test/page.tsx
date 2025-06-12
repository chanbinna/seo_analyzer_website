import { Metadata } from 'next'
import TestClient from './TestClient'

export const metadata: Metadata = {
  title: 'SEO 분석 결과',
  description: '웹사이트의 SEO 분석 결과를 확인하세요.',
  keywords: 'SEO, 분석, 결과, 점수, 개선점',
  openGraph: {
    title: 'SEO 분석 결과',
    description: '웹사이트의 SEO 분석 결과를 확인하세요.',
    type: 'website',
  },
}

export default function TestPage() {
  return <TestClient />
} 