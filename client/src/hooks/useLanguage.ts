import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'vi' : 'en';
    changeLanguage(newLang);
  };

  const setLanguage = (lang: string) => {
    changeLanguage(lang);
  };

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    isEnglish: currentLanguage === 'en',
    isVietnamese: currentLanguage === 'vi',
  };
};
