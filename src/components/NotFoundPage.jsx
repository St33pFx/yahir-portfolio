import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const home = i18n.language.startsWith('es') ? '/es/' : '/';
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="cs-not-found" id="main-content">
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.body')}</p>
        <a href={home}>← {t('caseStudy.back_home')}</a>
      </main>
    </>
  );
}
