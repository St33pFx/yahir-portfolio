import { useTranslation } from 'react-i18next';
import AnimatedLink from './AnimatedLink';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <span>{t('connect.footer_designed')}</span>
      <span>{t('connect.footer_rights')}</span>
      <div className="footer__links">
        <AnimatedLink text={t('connect.linkedin')}   href="https://linkedin.com"  target="_blank" rel="noopener noreferrer" />
        <AnimatedLink text={t('connect.instagram')}  href="https://instagram.com/jozemotion" target="_blank" rel="noopener noreferrer" />
      </div>
    </footer>
  );
}
