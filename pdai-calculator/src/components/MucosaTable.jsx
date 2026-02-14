import { useTranslation } from 'react-i18next';
import { MUCOSA_KEYS, SCORES } from '../hooks/useCalculator';

export default function MucosaTable({ mucosa, totals, updateMucosa }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6" aria-labelledby="mucosa-title">
      <h2 id="mucosa-title" className="text-2xl font-bold mb-4">{t('mucosa.title')}</h2>
      <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-sm no-print">
        <p className="font-bold mb-2 text-gray-800">{t('mucosa.scaleTitle')}</p>
        <ul className="space-y-1 ml-4 text-gray-700">
          <li><strong>0</strong> — {t('mucosa.scale0').replace('0 — ', '')}</li>
          <li><strong>1</strong> — {t('mucosa.scale1').replace('1 — ', '')}</li>
          <li><strong>2</strong> — {t('mucosa.scale2').replace('2 — ', '')}</li>
          <li><strong>5</strong> — {t('mucosa.scale5').replace('5 — ', '')}</li>
          <li><strong>10</strong> — {t('mucosa.scale10').replace('10 — ', '')}</li>
        </ul>
        <p className="font-bold mt-3 mb-1 text-gray-800">{t('mucosa.note')}</p>
        <p className="text-gray-700">{t('mucosa.noteText')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="border p-2 text-left">{t('mucosa.colLocation')}</th>
              <th className="border p-2 text-center">{t('mucosa.colErosions')}</th>
            </tr>
          </thead>
          <tbody>
            {MUCOSA_KEYS.map(k => (
              <tr key={k}>
                <td className="border px-2">{t(`mucosa.${k}`)}</td>
                <td className="border px-2">
                  <div className="flex gap-1 justify-center items-center no-print">
                    {SCORES.map(s => (
                      <button key={s} onClick={() => updateMucosa(k, s)} className={`px-2 py-1 text-xs rounded ${mucosa[k] === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{s}</button>
                    ))}
                  </div>
                  <div className="hidden print-only text-center">{mucosa[k]}</div>
                </td>
              </tr>
            ))}
            <tr className="bg-indigo-100 font-bold">
              <td className="border p-2">{t('mucosa.totalMucosa')}</td>
              <td className="border p-2 text-center">{totals.mucosaTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
