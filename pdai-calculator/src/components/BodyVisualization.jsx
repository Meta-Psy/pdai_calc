import { useTranslation } from 'react-i18next';

export default function BodyVisualization({ skinAreas, scalp, mucosa }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6 no-print" aria-labelledby="viz-title">
      <h2 id="viz-title" className="text-2xl font-bold text-gray-800 mb-4 text-center">{t('visualization.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-3 text-center">{t('visualization.head')}</h3>
          <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <svg viewBox="0 0 200 240" className="w-full h-full p-2" role="img" aria-label={t('visualization.head')}>
              <ellipse cx="100" cy="100" rx="60" ry="70" fill="#d1d5db" stroke="#6b7280" strokeWidth="2"/>
              <ellipse cx="50" cy="100" rx="12" ry="20" fill={skinAreas.ears.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="1.5"/>
              <ellipse cx="150" cy="100" rx="12" ry="20" fill={skinAreas.ears.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="1.5"/>
              <path d="M 40 70 Q 100 30 160 70" fill={scalp.erosions > 0 ? '#ef4444' : '#9ca3af'} stroke="#6b7280" strokeWidth="1.5"/>
              <ellipse cx="80" cy="90" rx="8" ry="10" fill="white" stroke="#6b7280" strokeWidth="1"/>
              <ellipse cx="120" cy="90" rx="8" ry="10" fill="white" stroke="#6b7280" strokeWidth="1"/>
              <circle cx="80" cy="92" r="4" fill="#4b5563"/>
              <circle cx="120" cy="92" r="4" fill="#4b5563"/>
              <path d="M 100 100 L 95 120 L 100 122 L 105 120 Z" fill={skinAreas.nose.erosions > 0 ? '#ef4444' : '#b8bcc4'} stroke="#6b7280" strokeWidth="1"/>
              <path d="M 80 135 Q 100 145 120 135" fill="none" stroke="#6b7280" strokeWidth="2"/>
              <rect x="85" y="165" width="30" height="35" fill={skinAreas.neck.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2" rx="5"/>
              <ellipse cx="100" cy="120" rx="45" ry="35" fill={skinAreas.face.erosions > 0 ? 'rgba(239, 68, 68, 0.3)' : 'none'} stroke={skinAreas.face.erosions > 0 ? '#ef4444' : 'transparent'} strokeWidth="3" strokeDasharray="5,5"/>
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-3 text-center">{t('visualization.oral')}</h3>
          <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <svg viewBox="0 0 200 200" className="w-full h-full p-2" role="img" aria-label={t('visualization.oral')}>
              <ellipse cx="100" cy="100" rx="70" ry="50" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2"/>
              <path d="M 30 100 Q 100 80 170 100" fill={mucosa.lips > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2"/>
              <path d="M 30 100 Q 100 120 170 100" fill={mucosa.lips > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2"/>
              <ellipse cx="100" cy="110" rx="35" ry="25" fill={mucosa.tongue > 0 ? '#ef4444' : '#c7cace'} stroke="#6b7280" strokeWidth="1.5"/>
              <path d="M 50 70 Q 100 60 150 70" fill={mucosa.hardPalate > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="1"/>
              <path d="M 60 75 Q 100 85 140 75" fill={mucosa.softPalate > 0 ? '#ef4444' : '#e5e7eb'} stroke="#6b7280" strokeWidth="1"/>
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-3 text-center">{t('visualization.torso')}</h3>
          <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
            <svg viewBox="0 0 200 300" className="w-full h-full p-2" role="img" aria-label={t('visualization.torso')}>
              <rect x="70" y="20" width="60" height="50" fill={skinAreas.chest.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2" rx="10"/>
              <rect x="70" y="75" width="60" height="55" fill={skinAreas.abdomen.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2" rx="10"/>
              <rect x="25" y="25" width="20" height="70" fill={skinAreas.arms.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2" rx="10"/>
              <rect x="155" y="25" width="20" height="70" fill={skinAreas.arms.erosions > 0 ? '#ef4444' : '#d1d5db'} stroke="#6b7280" strokeWidth="2" rx="10"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
