import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'SEO란? - SEO 점수 분석기',
  description: 'SEO(검색 엔진 최적화)의 개념과 중요성에 대해 알아봅니다.',
  keywords: 'SEO, 검색 엔진 최적화, SEO 개념, SEO 중요성',
};

export default function AboutPage() {
  return <AboutClient />;
} 