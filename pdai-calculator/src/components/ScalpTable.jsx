import { useTranslation } from 'react-i18next';
import { SCALP_SCORES } from '../hooks/useCalculator';

export default function ScalpTable({ scalp, totals, updateScalp }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6" aria-labelledby="scalp-title">
      <h2 id="scalp-title" className="text-2xl font-bold mb-4">{t('scalp.title')}</h2>
      <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-sm no-print">
        <p className="font-bold mb-2 text-gray-800">{t('scalp.scaleTitle')}</p>
        <ul className="space-y-1 ml-4 text-gray-700">
          <li><strong>0</strong> — {t('scalp.scale0').replace('0 — ', '')}</li>
          <li><strong>1</strong> — {t('scalp.scale1').replace('1 — ', '')}</li>
          <li><strong>2</strong> — {t('scalp.scale2').replace('2 — ', '')}</li>
          <li><strong>3</strong> — {t('scalp.scale3').replace('3 — ', '')}</li>
          <li><strong>4</strong> — {t('scalp.scale4').replace('4 — ', '')}</li>
          <li><strong>10</strong> — {t('scalp.scale10').replace('10 — ', '')}</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="border p-2 text-left">{t('scalp.colScalp')}</th>
              <th className="border p-2 text-center">{t('scalp.colErosions')}</th>
              <th className="border p-2 text-center">{t('scalp.colLesionCount')}</th>
              <th className="border p-2 text-center">{t('scalp.colPigmentation')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2">{t('scalp.colScalp')}</td>
              <td className="border px-2">
                <div className="flex gap-1 justify-center items-center no-print">
                  {SCALP_SCORES.map(s => (
                    <button key={s} onClick={() => updateScalp('erosions', s)} className={`px-2 py-1 text-xs rounded ${scalp.erosions === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{s}</button>
                  ))}
                </div>
                <div className="hidden print-only text-center">{scalp.erosions}</div>
              </td>
              <td className="border px-2 text-center">
                <select value={scalp.lesionCount} onChange={e => updateScalp('lesionCount', e.target.value)} className="px-2 py-1 border rounded text-xs text-center">
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>
                </select>
              </td>
              <td className="border px-2 text-center">
                <select value={scalp.pigmentation} onChange={e => updateScalp('pigmentation', e.target.value)} className="px-2 py-1 border rounded text-xs text-center">
                  <option value="0">0</option><option value="1">1</option>
                </select>
              </td>
            </tr>
            <tr className="bg-indigo-100 font-bold">
              <td className="border p-2">{t('scalp.totalScalp')}</td>
              <td className="border p-2 text-center">{totals.scalpErosions}</td>
              <td className="border p-2 text-center">{totals.scalpLesionCount.toFixed(1)}</td>
              <td className="border p-2 text-center">{totals.scalpPigmentation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
