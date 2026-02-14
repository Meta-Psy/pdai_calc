import { useTranslation } from 'react-i18next';
import { SKIN_KEYS, SCORES } from '../hooks/useCalculator';

export default function SkinTable({ skinAreas, totals, updateSkin }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6" aria-labelledby="skin-title">
      <h2 id="skin-title" className="text-2xl font-bold mb-4">{t('skin.title')}</h2>
      <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-sm no-print">
        <p className="font-bold mb-2 text-gray-800">{t('skin.scaleTitle')}</p>
        <ul className="space-y-1 ml-4 text-gray-700">
          <li><strong>0</strong> — {t('skin.scale0').replace('0 — ', '')}</li>
          <li><strong>1</strong> — {t('skin.scale1').replace('1 — ', '')}</li>
          <li><strong>2</strong> — {t('skin.scale2').replace('2 — ', '')}</li>
          <li><strong>3</strong> — {t('skin.scale3').replace('3 — ', '')}</li>
          <li><strong>5</strong> — {t('skin.scale5').replace('5 — ', '')}</li>
          <li><strong>10</strong> — {t('skin.scale10').replace('10 — ', '')}</li>
        </ul>
        <p className="font-bold mt-3 mb-1 text-gray-800">{t('skin.lesionTitle')}</p>
        <p className="text-gray-700">{t('skin.lesionDesc')}</p>
        <ul className="space-y-1 ml-4 mt-1 text-gray-700">
          <li><strong>{t('skin.lesion1')}</strong></li>
          <li><strong>{t('skin.lesion2')}</strong></li>
          <li><strong>{t('skin.lesion3')}</strong></li>
        </ul>
        <p className="font-bold mt-3 mb-1 text-gray-800">{t('skin.pigmentationTitle')}</p>
        <ul className="space-y-1 ml-4 text-gray-700">
          <li><strong>0</strong> — {t('skin.pigmentation0').replace('0 — ', '')}</li>
          <li><strong>1</strong> — {t('skin.pigmentation1').replace('1 — ', '')}</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="border p-2 text-left">{t('skin.colLocation')}</th>
              <th className="border p-2 text-center">{t('skin.colErosions')}</th>
              <th className="border p-2 text-center">{t('skin.colLesionCount')}</th>
              <th className="border p-2 text-center">{t('skin.colPigmentation')}</th>
            </tr>
          </thead>
          <tbody>
            {SKIN_KEYS.map(k => (
              <tr key={k}>
                <td className="border px-2">{t(`skin.${k}`)}</td>
                <td className="border px-2">
                  <div className="flex gap-1 justify-center items-center no-print">
                    {SCORES.map(s => (
                      <button key={s} onClick={() => updateSkin(k, 'erosions', s)} className={`px-1.5 md:px-2 py-1 text-xs rounded min-w-[24px] ${skinAreas[k].erosions === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{s}</button>
                    ))}
                  </div>
                  <div className="hidden print-only text-center">{skinAreas[k].erosions}</div>
                </td>
                <td className="border px-2 text-center">
                  <select value={skinAreas[k].lesionCount} onChange={e => updateSkin(k, 'lesionCount', e.target.value)} className="px-2 py-1 border rounded text-xs text-center">
                    <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
                  </select>
                </td>
                <td className="border px-2 text-center">
                  <select value={skinAreas[k].pigmentation} onChange={e => updateSkin(k, 'pigmentation', e.target.value)} className="px-2 py-1 border rounded text-xs text-center">
                    <option value="0">0</option><option value="1">1</option>
                  </select>
                </td>
              </tr>
            ))}
            <tr className="bg-indigo-100 font-bold">
              <td className="border p-2">{t('skin.totalSkin')}</td>
              <td className="border p-2 text-center">{totals.skinErosions}</td>
              <td className="border p-2 text-center">{totals.skinLesionCount.toFixed(1)}</td>
              <td className="border p-2 text-center">{totals.skinPigmentation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
