'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageProvider } from '../context/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/Footer';

function NavBar() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                {language === 'ko' ? 'SEO 점수 분석기' : 'SEO Score Analyzer'}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {language === 'ko' ? '홈' : 'Home'}
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/about') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {language === 'ko' ? 'SEO란?' : 'About SEO'}
              </Link>
              <Link
                href="/howitworks"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/howitworks') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {language === 'ko' ? '작동원리' : 'How It Works'}
              </Link>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <NavBar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
} 