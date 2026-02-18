import { useTranslation } from 'react-i18next';

const R = '#ef4444';
const G = '#e5e7eb';
const D = '#d1d5db';
const S = '#6b7280';
const B = '#93c5fd';

function zc(area) {
  if (area.erosions > 0) return R;
  if (area.pigmentation > 0) return B;
  return D;
}

function mc(val) {
  return val > 0 ? R : D;
}

export default function BodyVisualization({ skinAreas, scalp, mucosa }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 print-viz" aria-labelledby="viz-title">
      <h2 id="viz-title" className="text-lg md:text-2xl font-bold text-gray-800 mb-3 text-center">{t('visualization.title')}</h2>
      <div className="grid grid-cols-3 gap-2 md:gap-4">

        {/* 1. HEAD + extra-oral mucosa */}
        <div>
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 md:mb-2 text-center">{t('visualization.head')}</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <svg viewBox="0 0 200 290" className="w-full h-full p-2" role="img" aria-label={t('visualization.head')}>
              {/* Scalp */}
              <path d="M 40 70 Q 100 30 160 70" fill={scalp.erosions > 0 ? R : (scalp.pigmentation > 0 ? B : '#9ca3af')} stroke={S} strokeWidth="1.5"/>

              {/* Head outline */}
              <ellipse cx="100" cy="100" rx="60" ry="70" fill={zc(skinAreas.face)} stroke={S} strokeWidth="2"/>

              {/* Face zone overlay */}
              <ellipse cx="100" cy="115" rx="45" ry="35"
                fill={skinAreas.face.erosions > 0 ? 'rgba(239, 68, 68, 0.2)' : 'none'}
                stroke={skinAreas.face.erosions > 0 ? R : 'transparent'} strokeWidth="2" strokeDasharray="5,5"/>

              {/* Ears */}
              <ellipse cx="38" cy="100" rx="10" ry="18" fill={zc(skinAreas.ears)} stroke={S} strokeWidth="1.5"/>
              <ellipse cx="162" cy="100" rx="10" ry="18" fill={zc(skinAreas.ears)} stroke={S} strokeWidth="1.5"/>

              {/* Eyes */}
              <ellipse cx="78" cy="88" rx="10" ry="8" fill="white" stroke={S} strokeWidth="1"/>
              <ellipse cx="122" cy="88" rx="10" ry="8" fill="white" stroke={S} strokeWidth="1"/>
              <circle cx="78" cy="90" r="4" fill="#4b5563"/>
              <circle cx="122" cy="90" r="4" fill="#4b5563"/>

              {/* Nose */}
              <path d="M 100 100 L 94 120 L 100 123 L 106 120 Z" fill={zc(skinAreas.nose)} stroke={S} strokeWidth="1"/>

              {/* Mouth */}
              <path d="M 82 135 Q 100 145 118 135" fill="none" stroke={S} strokeWidth="2"/>

              {/* Neck */}
              <rect x="82" y="170" width="36" height="40" rx="6" fill={zc(skinAreas.neck)} stroke={S} strokeWidth="1.5"/>

              {/* Labels */}
              <text x="100" y="55" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="500">{t('scalp.title')}</text>
              <text x="100" y="160" textAnchor="middle" fontSize="8" fill="#374151">{t('skin.face')}</text>
              <text x="100" y="198" textAnchor="middle" fontSize="8" fill="#374151">{t('skin.neck')}</text>
              <text x="22" y="104" textAnchor="middle" fontSize="6" fill="#6b7280">{t('skin.ears')}</text>

              {/* Extra-oral mucosa indicators */}
              <text x="100" y="225" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="600">{t('visualization.extraOral')}</text>

              <rect x="5" y="233" width="56" height="18" rx="3" fill={mc(mucosa.eyes)} stroke={S} strokeWidth="0.6"/>
              <text x="33" y="245" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.eyes')}</text>

              <rect x="72" y="233" width="56" height="18" rx="3" fill={mc(mucosa.nose)} stroke={S} strokeWidth="0.6"/>
              <text x="100" y="245" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.nose')}</text>

              <rect x="139" y="233" width="56" height="18" rx="3" fill={mc(mucosa.anogenital)} stroke={S} strokeWidth="0.6"/>
              <text x="167" y="245" textAnchor="middle" fontSize="5.5" fill="#374151">{t('mucosa.anogenital')}</text>
            </svg>
          </div>
        </div>

        {/* 2. ORAL CAVITY */}
        <div>
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 md:mb-2 text-center">{t('visualization.oral')}</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center aspect-square">
            <svg viewBox="0 0 200 200" className="w-full h-full p-2" role="img" aria-label={t('visualization.oral')}>
              {/* Outer lips */}
              <ellipse cx="100" cy="95" rx="80" ry="60" fill={mc(mucosa.lips)} stroke={S} strokeWidth="2"/>

              {/* Inner oral cavity */}
              <ellipse cx="100" cy="95" rx="64" ry="48" fill="#fecaca" stroke={S} strokeWidth="1"/>

              {/* Hard palate */}
              <path d="M 45 65 Q 100 42 155 65" fill={mc(mucosa.hardPalate)} stroke={S} strokeWidth="1.2"/>
              <text x="100" y="58" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.hardPalate')}</text>

              {/* Soft palate */}
              <path d="M 52 68 Q 100 56 148 68" fill={mc(mucosa.softPalate)} stroke={S} strokeWidth="1"/>
              <text x="100" y="74" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.softPalate')}</text>

              {/* Upper gingiva */}
              <path d="M 42 72 Q 100 64 158 72 L 154 79 Q 100 71 46 79 Z"
                fill={mc(mucosa.upperGingiva)} stroke={S} strokeWidth="0.8"/>

              {/* Pharynx */}
              <ellipse cx="100" cy="82" rx="12" ry="8" fill={mc(mucosa.pharynx)} stroke={S} strokeWidth="0.8"/>
              <text x="100" y="85" textAnchor="middle" fontSize="5" fill="#374151">{t('mucosa.pharynx')}</text>

              {/* Buccal (cheeks) */}
              <ellipse cx="46" cy="98" rx="14" ry="22" fill={mc(mucosa.buccal)} stroke={S} strokeWidth="0.8"/>
              <ellipse cx="154" cy="98" rx="14" ry="22" fill={mc(mucosa.buccal)} stroke={S} strokeWidth="0.8"/>
              <text x="46" y="101" textAnchor="middle" fontSize="5" fill="#374151">{t('mucosa.buccal')}</text>

              {/* Tongue */}
              <ellipse cx="100" cy="105" rx="34" ry="20" fill={mc(mucosa.tongue)} stroke={S} strokeWidth="1.2"/>
              <text x="100" y="109" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.tongue')}</text>

              {/* Floor of mouth */}
              <path d="M 72 125 Q 100 136 128 125" fill={mc(mucosa.floorOfMouth)} stroke={S} strokeWidth="0.8"/>
              <text x="100" y="138" textAnchor="middle" fontSize="5" fill="#374151">{t('mucosa.floorOfMouth')}</text>

              {/* Lower gingiva */}
              <path d="M 46 130 Q 100 140 154 130 L 158 137 Q 100 147 42 137 Z"
                fill={mc(mucosa.lowerGingiva)} stroke={S} strokeWidth="0.8"/>

              {/* Lips label */}
              <text x="100" y="158" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.lips')}</text>

              {/* Gingiva labels */}
              <text x="172" y="78" fontSize="5" fill="#6b7280">{t('mucosa.upperGingiva')}</text>
              <text x="172" y="137" fontSize="5" fill="#6b7280">{t('mucosa.lowerGingiva')}</text>
            </svg>
          </div>
        </div>

        {/* 3. BODY */}
        <div>
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 md:mb-2 text-center">{t('visualization.body')}</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center" style={{ aspectRatio: '3/4' }}>
            <svg viewBox="0 0 200 280" className="w-full h-full p-2" role="img" aria-label={t('visualization.body')}>
              {/* Torso outline */}
              <path d="M 70 10 L 70 120 Q 70 130 80 130 L 120 130 Q 130 130 130 120 L 130 10 Z"
                fill={G} stroke={S} strokeWidth="1.5"/>

              {/* Chest zone */}
              <rect x="74" y="14" width="52" height="45" rx="6"
                fill={zc(skinAreas.chest)} stroke={S} strokeWidth="1" opacity="0.85"/>
              <text x="100" y="42" textAnchor="middle" fontSize="8" fill="#374151">{t('skin.chest')}</text>

              {/* Abdomen zone */}
              <rect x="74" y="63" width="52" height="45" rx="6"
                fill={zc(skinAreas.abdomen)} stroke={S} strokeWidth="1" opacity="0.85"/>
              <text x="100" y="90" textAnchor="middle" fontSize="8" fill="#374151">{t('skin.abdomen')}</text>

              {/* Genitals */}
              <ellipse cx="100" cy="125" rx="10" ry="6"
                fill={zc(skinAreas.genitals)} stroke={S} strokeWidth="0.8"/>
              <text x="100" y="128" textAnchor="middle" fontSize="5" fill="#374151">{t('skin.genitals')}</text>

              {/* Left arm */}
              <rect x="30" y="14" width="22" height="75" rx="10"
                fill={zc(skinAreas.arms)} stroke={S} strokeWidth="1.5"/>
              <text x="41" y="56" textAnchor="middle" fontSize="6" fill="#374151" transform="rotate(-90,41,56)">{t('skin.arms')}</text>

              {/* Right arm */}
              <rect x="148" y="14" width="22" height="75" rx="10"
                fill={zc(skinAreas.arms)} stroke={S} strokeWidth="1.5"/>

              {/* Left hand */}
              <rect x="32" y="93" width="18" height="22" rx="5"
                fill={zc(skinAreas.hands)} stroke={S} strokeWidth="1"/>
              <text x="41" y="107" textAnchor="middle" fontSize="5" fill="#374151">{t('skin.hands')}</text>

              {/* Right hand */}
              <rect x="150" y="93" width="18" height="22" rx="5"
                fill={zc(skinAreas.hands)} stroke={S} strokeWidth="1"/>

              {/* Left leg */}
              <rect x="72" y="136" width="24" height="90" rx="10"
                fill={zc(skinAreas.legs)} stroke={S} strokeWidth="1.5"/>
              <text x="84" y="185" textAnchor="middle" fontSize="6" fill="#374151" transform="rotate(-90,84,185)">{t('skin.legs')}</text>

              {/* Right leg */}
              <rect x="104" y="136" width="24" height="90" rx="10"
                fill={zc(skinAreas.legs)} stroke={S} strokeWidth="1.5"/>

              {/* Left foot */}
              <rect x="68" y="230" width="30" height="16" rx="5"
                fill={zc(skinAreas.feet)} stroke={S} strokeWidth="1"/>
              <text x="83" y="241" textAnchor="middle" fontSize="6" fill="#374151">{t('skin.feet')}</text>

              {/* Right foot */}
              <rect x="102" y="230" width="30" height="16" rx="5"
                fill={zc(skinAreas.feet)} stroke={S} strokeWidth="1"/>

              {/* Back indicator */}
              <rect x="140" y="140" width="52" height="20" rx="4"
                fill={zc(skinAreas.back)} stroke={S} strokeWidth="0.8"/>
              <text x="166" y="153" textAnchor="middle" fontSize="7" fill="#374151" fontWeight="500">{t('skin.back')}</text>
              <line x1="140" y1="150" x2="132" y2="100" stroke={S} strokeWidth="0.6" strokeDasharray="3,2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: D, border: `1px solid ${S}` }}/>
          {t('visualization.normal')}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: R }}/>
          {t('visualization.affected')}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: B }}/>
          {t('visualization.pigmentation')}
        </span>
      </div>
    </section>
  );
}
