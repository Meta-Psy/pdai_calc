import { useTranslation } from 'react-i18next';
import { InfoIcon } from './icons';

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white mb-6 no-print" aria-labelledby="info-title">
      <div className="flex gap-4">
        <InfoIcon />
        <div>
          <h2 id="info-title" className="text-2xl font-bold mb-3">{t('info.title')}</h2>
          <p className="text-sm mb-3">{t('info.description')}</p>
          <div className="text-sm space-y-2">
            <p><strong>{t('info.interpretation')}</strong></p>
            <ul className="list-disc ml-5">
              <li>{t('info.mild')}</li>
              <li>{t('info.moderate')}</li>
              <li>{t('info.severe')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
