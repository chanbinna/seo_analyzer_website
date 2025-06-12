import type { Metadata } from 'next';
import { HowItWorksContent } from './HowItWorksContent';

export const metadata: Metadata = {
  title: '작동원리 - SEO 점수 분석기',
  description: 'SEO 점수 분석기가 실제로 웹사이트를 어떻게 분석하는지, 각 항목별로 어떤 데이터를 어떻게 추출하는지 설명합니다.',
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
} 