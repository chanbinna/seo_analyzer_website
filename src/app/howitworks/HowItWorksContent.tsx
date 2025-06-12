'use client';

import { useLanguage } from '../../context/LanguageContext';

export function HowItWorksContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {language === 'ko' ? 'SEO 점수 분석기 작동원리' : 'How SEO Score Analyzer Works'}
        </h1>
        <p className="text-gray-700 mb-10 text-center">
          {language === 'ko' ? (
            <>
              이 도구는 실제 웹사이트의 데이터를 직접 분석하여 신뢰성 있는 SEO 점수와 개선사항을 제공합니다.<br />
              각 항목별로 어떤 방식으로 데이터를 수집하고 분석하는지 아래에서 확인할 수 있습니다.
            </>
          ) : (
            <>
              This tool directly analyzes real website data to provide reliable SEO scores and improvements.<br />
              You can see how data is collected and analyzed for each item below.
            </>
          )}
        </p>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '1. 페이지 로딩 속도' : '1. Page Loading Speed'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  Google PageSpeed Insights(Lighthouse) API를 통해 입력한 웹사이트의 실제 성능 점수를 받아옵니다.<br />
                  <span className="text-blue-600">실제 크롬 환경에서 측정된 퍼포먼스 점수</span>를 사용합니다.
                </>
              ) : (
                <>
                  The actual performance score of the entered website is received through the Google PageSpeed Insights (Lighthouse) API.<br />
                  <span className="text-blue-600">Performance score measured in a real Chrome environment</span> is used.
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '2. 모바일 최적화' : '2. Mobile Optimization'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  웹사이트의 <span className="font-medium">viewport 메타 태그</span>를 HTML에서 직접 추출하여, 모바일 친화적 설정(width=device-width, initial-scale 등) 여부를 분석합니다.
                </>
              ) : (
                <>
                  The <span className="font-medium">viewport meta tag</span> of the website is directly extracted from the HTML to analyze whether it is mobile-friendly (width=device-width, initial-scale, etc.).
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '3. SSL 인증서' : '3. SSL Certificate'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  입력한 URL이 <span className="font-medium">https로 시작하는지</span>를 확인하여 SSL 적용 여부를 판단합니다.
                </>
              ) : (
                <>
                  It checks whether the entered URL <span className="font-medium">starts with https</span> to determine if SSL is applied.
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '4. 사이트맵' : '4. Sitemap'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  <span className="font-medium">/sitemap.xml</span> 파일이 실제로 존재하는지 HTTP 요청으로 확인합니다.
                </>
              ) : (
                <>
                  It checks if the <span className="font-medium">/sitemap.xml</span> file actually exists through an HTTP request.
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '5. 메타 태그' : '5. Meta Tags'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  HTML의 <span className="font-medium">&lt;title&gt;</span>과 <span className="font-medium">&lt;meta name='description'&gt;</span> 태그를 파싱하여, 존재 여부와 길이, 내용의 적절성을 평가합니다.
                </>
              ) : (
                <>
                  The <span className="font-medium">&lt;title&gt;</span> and <span className="font-medium">&lt;meta name='description'&gt;</span> tags in the HTML are parsed to evaluate their existence, length, and appropriateness of content.
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '6. 제목 구조' : '6. Title Structure'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  <span className="font-medium">&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</span> 태그의 개수와 구조를 분석하여, 올바른 계층 구조와 중복 여부를 평가합니다.
                </>
              ) : (
                <>
                  The number and structure of <span className="font-medium">&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</span> tags are analyzed to evaluate the correct hierarchy and duplication.
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '7. 이미지 최적화' : '7. Image Optimization'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  모든 <span className="font-medium">&lt;img&gt;</span> 태그를 파싱하여 <span className="font-medium">alt 속성</span>의 존재 여부, 최적화 상태(향후 확장 가능)를 평가합니다.
                </>
              ) : (
                <>
                  All <span className="font-medium">&lt;img&gt;</span> tags are parsed to evaluate the existence of the <span className="font-medium">alt attribute</span> and optimization status (expandable in the future).
                </>
              )}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {language === 'ko' ? '8. 키워드 사용' : '8. Keyword Usage'}
            </h2>
            <p className="text-gray-600">
              {language === 'ko' ? (
                <>
                  본문 텍스트에서 주요 키워드를 추출하고, <span className="font-medium">키워드 밀도</span>와 <span className="font-medium">주요 키워드</span>의 적절성을 분석합니다.
                </>
              ) : (
                <>
                  Main keywords are extracted from the body text, and the appropriateness of <span className="font-medium">keyword density</span> and <span className="font-medium">main keywords</span> is analyzed.
                </>
              )}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 