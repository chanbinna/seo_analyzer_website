'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutClient() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{language === 'ko' ? 'SEO란?' : 'What is SEO?'}</h1>
          <p className="text-gray-600 text-lg mb-8">
            {language === 'ko'
              ? '검색 엔진 최적화(Search Engine Optimization)에 대해 알아봅시다'
              : "Let's learn about Search Engine Optimization (SEO)."}
          </p>
        </div>
        <div className="space-y-12">
          {/* SEO 정의 섹션 */}
          <section className="bg-blue-50 rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">{language === 'ko' ? 'SEO의 정의' : 'Definition of SEO'}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                {language === 'ko'
                  ? 'SEO(Search Engine Optimization)는 검색 엔진 최적화를 의미하며, 웹사이트가 검색 엔진의 검색 결과에서 더 높은 순위를 차지하도록 최적화하는 과정입니다. 이를 통해 자연스러운 트래픽을 유도하고 웹사이트의 가시성을 높일 수 있습니다.'
                  : 'SEO (Search Engine Optimization) is the process of optimizing a website to rank higher in search engine results, thereby increasing organic traffic and visibility.'}
              </p>
              <p className="text-gray-700">
                {language === 'ko'
                  ? 'SEO는 검색 엔진이 웹사이트의 콘텐츠를 더 잘 이해하고 색인화할 수 있도록 도와주는 다양한 기술과 전략을 포함합니다.'
                  : "SEO includes various techniques and strategies that help search engines better understand and index your website's content."}
              </p>
            </div>
          </section>
          {/* SEO의 중요성 섹션 */}
          <section className="bg-blue-50 rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">{language === 'ko' ? 'SEO가 중요한 이유' : 'Why is SEO Important?'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '검색 트래픽 증가' : 'Increase in Search Traffic'}</h3>
                <p className="text-gray-700">
                  {language === 'ko'
                    ? '검색 엔진은 대부분의 웹 트래픽의 주요 소스입니다. SEO를 통해 검색 결과 상위에 노출되면 자연스러운 방문자 수가 증가합니다.'
                    : 'Search engines are the main source of most web traffic. Ranking higher through SEO increases your organic visitors.'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '신뢰도 향상' : 'Improved Trust'}</h3>
                <p className="text-gray-700">
                  {language === 'ko'
                    ? '검색 결과 상위에 노출되는 웹사이트는 사용자들에게 더 신뢰할 수 있는 것으로 인식됩니다.'
                    : 'Websites that appear at the top of search results are perceived as more trustworthy by users.'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '비용 효율성' : 'Cost Effectiveness'}</h3>
                <p className="text-gray-700">
                  {language === 'ko'
                    ? '유료 광고와 달리, SEO는 지속적인 노력만으로 장기적인 트래픽을 얻을 수 있는 비용 효율적인 방법입니다.'
                    : 'Unlike paid ads, SEO is a cost-effective way to gain long-term traffic with ongoing effort.'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '사용자 경험 개선' : 'Improved User Experience'}</h3>
                <p className="text-gray-700">
                  {language === 'ko'
                    ? 'SEO 최적화는 웹사이트의 속도, 모바일 호환성, 콘텐츠 품질 등 사용자 경험을 전반적으로 개선합니다.'
                    : 'SEO optimization improves overall user experience, including site speed, mobile compatibility, and content quality.'}
                </p>
              </div>
            </div>
          </section>
          {/* SEO 요소 섹션 */}
          <section className="bg-blue-50 rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">{language === 'ko' ? '주요 SEO 요소' : 'Key SEO Elements'}</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '기술적 SEO' : 'Technical SEO'}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{language === 'ko' ? '웹사이트 로딩 속도 최적화' : 'Optimize website loading speed'}</li>
                  <li>{language === 'ko' ? '모바일 친화적 디자인' : 'Mobile-friendly design'}</li>
                  <li>{language === 'ko' ? 'SSL 인증서 적용' : 'Apply SSL certificate'}</li>
                  <li>{language === 'ko' ? '사이트맵 및 로봇.txt 설정' : 'Set up sitemap and robots.txt'}</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10), 0 -8px 24px -4px rgba(31,38,135,0.10)' }}>
                <h3 className="text-xl font-semibold mb-3">{language === 'ko' ? '콘텐츠 SEO' : 'Content SEO'}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{language === 'ko' ? '메타 태그 최적화 (제목, 설명)' : 'Optimize meta tags (title, description)'}</li>
                  <li>{language === 'ko' ? '제목 구조(H1, H2, H3) 적절한 사용' : 'Proper use of heading structure (H1, H2, H3)'}</li>
                  <li>{language === 'ko' ? '이미지 최적화 (alt 태그, 크기)' : 'Image optimization (alt tags, size)'}</li>
                  <li>{language === 'ko' ? '키워드 연구 및 자연스러운 사용' : 'Keyword research and natural usage'}</li>
                </ul>
              </div>
            </div>
          </section>
          {/* SEO 모범 사례 섹션 */}
          <section className="bg-blue-50 rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">{language === 'ko' ? 'SEO 모범 사례' : 'SEO Best Practices'}</h2>
            <div className="prose prose-lg max-w-none">
              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>{language === 'ko' ? '고품질 콘텐츠 작성:' : 'Create high-quality content:'}</strong> {language === 'ko' ? '사용자에게 가치 있는 정본 콘텐츠를 작성합니다.' : 'Create original content that provides valuable information to users.'}
                </li>
                <li>
                  <strong>{language === 'ko' ? '키워드 연구:' : 'Keyword research:'}</strong> {language === 'ko' ? '타겟 키워드를 조사하고 자연스럽게 콘텐츠에 통합합니다.' : 'Research target keywords and integrate them naturally into your content.'}
                </li>
                <li>
                  <strong>{language === 'ko' ? '모바일 최적화:' : 'Mobile optimization:'}</strong> {language === 'ko' ? '모든 디바이스에서 최적의 사용자 경험을 제공합니다.' : 'Provide the best user experience on all devices.'}
                </li>
                <li>
                  <strong>{language === 'ko' ? '페이지 속도 개선:' : 'Improve page speed:'}</strong> {language === 'ko' ? '이미지 최적화, 캐싱, 코드 최소화 등을 통해 로딩 속도를 개선합니다.' : 'Improve loading speed through image optimization, caching, and code minimization.'}
                </li>
                <li>
                  <strong>{language === 'ko' ? '사용자 경험 개선:' : 'Improve user experience:'}</strong> {language === 'ko' ? '직관적인 네비게이션, 명확한 구조, 빠른 로딩 시간을 제공합니다.' : 'Provide intuitive navigation, clear structure, and fast loading times.'}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 