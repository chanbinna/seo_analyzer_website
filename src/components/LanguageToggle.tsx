'use client';

import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  console.log('LanguageToggle render', language);
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          console.log('toggle click');
          toggleLanguage();
        }}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {language === 'ko' ? 'English' : '한국어'}
      </button>
    </div>
  );
} 