import { useTranslation } from 'react-i18next';

const R = '#ef4444';
const G = '#e5e7eb';
const D = '#d1d5db';
const S = '#6b7280';

function zc(area) {
  if (area.erosions > 0) return R;
  if (area.pigmentation > 0) return '#93c5fd';
  return G;
}

function mc(val) {
  return val > 0 ? R : G;
}

export default function BodyVisualization({ skinAreas, scalp, mucosa }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 print-viz" aria-labelledby="viz-title">
      <h2 id="viz-title" className="text-lg md:text-2xl font-bold text-gray-800 mb-3 text-center">{t('visualization.title')}</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-6">

        {/* BODY — front view */}
        <div>
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 md:mb-2 text-center">{t('visualization.body')}</h3>
          <svg viewBox="0 0 260 420" className="w-full max-h-[320px] md:max-h-none mx-auto" role="img" aria-label={t('visualization.body')}>
            {/* Scalp */}
            <path d="M 105 48 Q 130 25 155 48" fill={scalp.erosions > 0 ? R : D} stroke={S} strokeWidth="1.5"/>

            {/* Head outline */}
            <ellipse cx="130" cy="68" rx="30" ry="28" fill={zc(skinAreas.face)} stroke={S} strokeWidth="1.5"/>

            {/* Ears */}
            <ellipse cx="97" cy="68" rx="5" ry="12" fill={zc(skinAreas.ears)} stroke={S} strokeWidth="1"/>
            <ellipse cx="163" cy="68" rx="5" ry="12" fill={zc(skinAreas.ears)} stroke={S} strokeWidth="1"/>

            {/* Eyes */}
            <ellipse cx="120" cy="62" rx="6" ry="4" fill="white" stroke={S} strokeWidth="0.8"/>
            <ellipse cx="140" cy="62" rx="6" ry="4" fill="white" stroke={S} strokeWidth="0.8"/>
            <circle cx="120" cy="63" r="2" fill="#374151"/>
            <circle cx="140" cy="63" r="2" fill="#374151"/>

            {/* Nose */}
            <path d="M 130 68 L 126 78 L 130 80 L 134 78 Z" fill={zc(skinAreas.nose)} stroke={S} strokeWidth="0.8"/>

            {/* Mouth */}
            <path d="M 122 86 Q 130 90 138 86" fill="none" stroke={S} strokeWidth="1"/>

            {/* Neck */}
            <rect x="120" y="96" width="20" height="20" rx="4" fill={zc(skinAreas.neck)} stroke={S} strokeWidth="1"/>

            {/* Torso */}
            <path d="M 100 116 L 100 230 Q 100 240 110 240 L 150 240 Q 160 240 160 230 L 160 116 Z"
              fill={G} stroke={S} strokeWidth="1.5"/>

            {/* Chest zone */}
            <rect x="105" y="120" width="50" height="45" rx="5"
              fill={zc(skinAreas.chest)} stroke={S} strokeWidth="0.8" opacity="0.8"/>

            {/* Abdomen zone */}
            <rect x="105" y="170" width="50" height="45" rx="5"
              fill={zc(skinAreas.abdomen)} stroke={S} strokeWidth="0.8" opacity="0.8"/>

            {/* Genitals */}
            <ellipse cx="130" cy="235" rx="10" ry="6"
              fill={zc(skinAreas.genitals)} stroke={S} strokeWidth="0.8"/>

            {/* Left arm */}
            <path d="M 100 120 L 72 120 Q 62 120 62 130 L 62 210 Q 62 218 68 218 L 78 218 Q 84 218 84 210 L 84 130 Q 84 124 88 120"
              fill={zc(skinAreas.arms)} stroke={S} strokeWidth="1.2"/>

            {/* Right arm */}
            <path d="M 160 120 L 188 120 Q 198 120 198 130 L 198 210 Q 198 218 192 218 L 182 218 Q 176 218 176 210 L 176 130 Q 176 124 172 120"
              fill={zc(skinAreas.arms)} stroke={S} strokeWidth="1.2"/>

            {/* Left hand */}
            <path d="M 62 218 L 58 238 Q 56 246 64 246 L 76 246 Q 84 246 82 238 L 84 218"
              fill={zc(skinAreas.hands)} stroke={S} strokeWidth="1"/>

            {/* Right hand */}
            <path d="M 176 218 L 174 238 Q 172 246 180 246 L 192 246 Q 200 246 198 238 L 198 218"
              fill={zc(skinAreas.hands)} stroke={S} strokeWidth="1"/>

            {/* Left leg */}
            <path d="M 100 240 L 100 355 Q 100 365 108 365 L 118 365 Q 126 365 126 355 L 126 240"
              fill={zc(skinAreas.legs)} stroke={S} strokeWidth="1.2"/>

            {/* Right leg */}
            <path d="M 134 240 L 134 355 Q 134 365 142 365 L 152 365 Q 160 365 160 355 L 160 240"
              fill={zc(skinAreas.legs)} stroke={S} strokeWidth="1.2"/>

            {/* Left foot */}
            <path d="M 100 365 L 92 380 Q 88 388 98 388 L 122 388 Q 128 388 126 380 L 126 365"
              fill={zc(skinAreas.feet)} stroke={S} strokeWidth="1"/>

            {/* Right foot */}
            <path d="M 134 365 L 134 380 Q 132 388 138 388 L 162 388 Q 172 388 168 380 L 160 365"
              fill={zc(skinAreas.feet)} stroke={S} strokeWidth="1"/>

            {/* Back indicator */}
            <rect x="200" y="140" width="50" height="24" rx="4"
              fill={zc(skinAreas.back)} stroke={S} strokeWidth="0.8"/>
            <text x="225" y="156" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="500">{t('skin.back')}</text>
            <line x1="198" y1="152" x2="162" y2="170" stroke={S} strokeWidth="0.6" strokeDasharray="3,2"/>

            {/* Labels */}
            <text x="130" y="42" textAnchor="middle" fontSize="7" fill="#6b7280">{t('scalp.title')}</text>
            <text x="130" y="72" textAnchor="middle" fontSize="7" fill="#374151">{t('skin.face')}</text>
            <text x="130" y="108" textAnchor="middle" fontSize="6" fill="#6b7280">{t('skin.neck')}</text>
            <text x="130" y="146" textAnchor="middle" fontSize="7" fill="#374151">{t('skin.chest')}</text>
            <text x="130" y="196" textAnchor="middle" fontSize="7" fill="#374151">{t('skin.abdomen')}</text>
            <text x="73" y="175" textAnchor="middle" fontSize="6" fill="#374151">{t('skin.arms')}</text>
            <text x="73" y="238" textAnchor="middle" fontSize="6" fill="#374151">{t('skin.hands')}</text>
            <text x="113" y="310" textAnchor="middle" fontSize="6" fill="#374151">{t('skin.legs')}</text>
            <text x="113" y="382" textAnchor="middle" fontSize="6" fill="#374151">{t('skin.feet')}</text>
          </svg>
        </div>

        {/* ORAL CAVITY + extra-oral mucosa */}
        <div>
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 md:mb-2 text-center">{t('visualization.oral')}</h3>
          <svg viewBox="0 0 260 420" className="w-full max-h-[320px] md:max-h-none mx-auto" role="img" aria-label={t('visualization.oral')}>

            {/* Outer lips */}
            <ellipse cx="130" cy="190" rx="90" ry="70" fill={mc(mucosa.lips)} stroke={S} strokeWidth="2"/>

            {/* Inner oral cavity */}
            <ellipse cx="130" cy="190" rx="72" ry="55" fill="#fecaca" stroke={S} strokeWidth="1"/>

            {/* Hard palate */}
            <path d="M 70 160 Q 130 130 190 160" fill={mc(mucosa.hardPalate)} stroke={S} strokeWidth="1.2"/>
            <text x="130" y="152" textAnchor="middle" fontSize="8" fill="#374151">{t('mucosa.hardPalate')}</text>

            {/* Soft palate */}
            <path d="M 78 163 Q 130 148 182 163" fill={mc(mucosa.softPalate)} stroke={S} strokeWidth="1"/>
            <text x="130" y="170" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.softPalate')}</text>

            {/* Upper gingiva */}
            <path d="M 68 170 Q 130 160 192 170 L 188 178 Q 130 168 72 178 Z"
              fill={mc(mucosa.upperGingiva)} stroke={S} strokeWidth="0.8"/>

            {/* Buccal (cheeks) */}
            <ellipse cx="72" cy="195" rx="16" ry="25" fill={mc(mucosa.buccal)} stroke={S} strokeWidth="0.8"/>
            <ellipse cx="188" cy="195" rx="16" ry="25" fill={mc(mucosa.buccal)} stroke={S} strokeWidth="0.8"/>
            <text x="72" y="198" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.buccal')}</text>

            {/* Tongue */}
            <ellipse cx="130" cy="205" rx="38" ry="22" fill={mc(mucosa.tongue)} stroke={S} strokeWidth="1.2"/>
            <text x="130" y="209" textAnchor="middle" fontSize="8" fill="#374151">{t('mucosa.tongue')}</text>

            {/* Floor of mouth */}
            <path d="M 92 227 Q 130 240 168 227" fill={mc(mucosa.floorOfMouth)} stroke={S} strokeWidth="0.8"/>
            <text x="130" y="240" textAnchor="middle" fontSize="6" fill="#374151">{t('mucosa.floorOfMouth')}</text>

            {/* Lower gingiva */}
            <path d="M 72 230 Q 130 240 188 230 L 192 238 Q 130 248 68 238 Z"
              fill={mc(mucosa.lowerGingiva)} stroke={S} strokeWidth="0.8"/>

            {/* Pharynx (back of throat) */}
            <ellipse cx="130" cy="175" rx="14" ry="10" fill={mc(mucosa.pharynx)} stroke={S} strokeWidth="0.8"/>
            <text x="130" y="178" textAnchor="middle" fontSize="5.5" fill="#374151">{t('mucosa.pharynx')}</text>

            {/* Lips label */}
            <text x="130" y="265" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.lips')}</text>

            {/* Upper/lower gingiva labels */}
            <text x="205" y="176" fontSize="5.5" fill="#6b7280">{t('mucosa.upperGingiva')}</text>
            <text x="205" y="238" fontSize="5.5" fill="#6b7280">{t('mucosa.lowerGingiva')}</text>

            {/* ── Extra-oral mucosa indicators ── */}
            <line x1="130" y1="280" x2="130" y2="300" stroke={S} strokeWidth="0.5" strokeDasharray="2,2"/>
            <text x="130" y="310" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="600">{t('visualization.extraOral')}</text>

            {/* Eyes */}
            <rect x="20" y="325" width="60" height="22" rx="4" fill={mc(mucosa.eyes)} stroke={S} strokeWidth="0.8"/>
            <text x="50" y="340" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.eyes')}</text>

            {/* Nose mucosa */}
            <rect x="100" y="325" width="60" height="22" rx="4" fill={mc(mucosa.nose)} stroke={S} strokeWidth="0.8"/>
            <text x="130" y="340" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.nose')}</text>

            {/* Anogenital */}
            <rect x="180" y="325" width="60" height="22" rx="4" fill={mc(mucosa.anogenital)} stroke={S} strokeWidth="0.8"/>
            <text x="210" y="340" textAnchor="middle" fontSize="7" fill="#374151">{t('mucosa.anogenital')}</text>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: G, border: `1px solid ${S}` }}/>
          {t('visualization.normal')}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: R }}/>
          {t('visualization.affected')}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#93c5fd' }}/>
          {t('visualization.pigmentation')}
        </span>
      </div>
    </section>
  );
}
