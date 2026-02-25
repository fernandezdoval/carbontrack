import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Castellano', flag: '🇪🇸' },
    { code: 'val', name: 'Valencià', flag: '🏴' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-2xl">{languages.find(l => l.code === language)?.flag}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-primary-50' : ''
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className={`font-medium ${language === lang.code ? 'text-primary-600' : 'text-gray-700'}`}>
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
