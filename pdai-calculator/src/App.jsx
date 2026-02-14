import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SEOHead from './components/SEOHead';
import LanguageSwitcher from './components/LanguageSwitcher';
import PatientForm from './components/PatientForm';
import BodyVisualization from './components/BodyVisualization';
import SkinTable from './components/SkinTable';
import ScalpTable from './components/ScalpTable';
import MucosaTable from './components/MucosaTable';
import ResultsSummary from './components/ResultsSummary';
import Recommendations from './components/Recommendations';
import InfoSection from './components/InfoSection';
import { CalculatorIcon, Printer, Download, Loader, RefreshCw } from './components/icons';
import { useCalculator } from './hooks/useCalculator';
import { generatePDF } from './utils/generatePDF';

export default function App() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const calc = useCalculator();
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    setPdfLoading(true);
    try {
      await generatePDF({
        patientData: calc.patientData,
        skinAreas: calc.skinAreas,
        scalp: calc.scalp,
        mucosa: calc.mucosa,
        totals: calc.totals,
        recommendations: calc.recommendations,
        t,
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setPdfLoading(false);
    }
  }, [calc.patientData, calc.skinAreas, calc.scalp, calc.mucosa, calc.totals, calc.recommendations, t]);

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <SEOHead />

      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 ${calc.recommendations.trim() ? 'has-recommendations' : ''}`}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <header className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Top row: language switcher */}
            <div className="flex justify-end mb-3 no-print">
              <LanguageSwitcher />
            </div>
            {/* Bottom row: logo + actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 md:p-3 rounded-lg text-white shrink-0">
                  <CalculatorIcon />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t('header.title')}</h1>
                  <p className="text-gray-500 text-xs md:text-sm">{t('header.subtitle')} <span className="text-gray-400">| {t('header.by')}</span></p>
                </div>
              </div>
              <div className="flex gap-2 no-print w-full sm:w-auto">
                <button onClick={handleDownloadPDF} disabled={pdfLoading} className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg transition-colors text-sm flex-1 sm:flex-none">
                  {pdfLoading ? <Loader /> : <Download />}<span>{pdfLoading ? t('actions.pdfLoading') : t('actions.downloadPdf')}</span>
                </button>
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm flex-1 sm:flex-none">
                  <Printer /><span>{t('actions.print')}</span>
                </button>
                <button onClick={calc.reset} className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm flex-1 sm:flex-none">
                  <RefreshCw /><span>{t('actions.reset')}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Print-only medical document header */}
          <div className="hidden print-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '12pt' }}>PDAI Calculator — Pemphigus Disease Area Index</strong>
              <span>{t('printHeader')} {new Date().toLocaleDateString()}</span>
            </div>
            {calc.patientData.fullName && (
              <div style={{ marginTop: '2px', fontSize: '9pt' }}>
                {t('patient.fullName')}: {calc.patientData.fullName}
                {calc.patientData.birthYear && <> | {t('patient.birthYear')}: {calc.patientData.birthYear}</>}
                {calc.patientData.diagnosis && <> | {t('patient.diagnosis')}: {calc.patientData.diagnosis}</>}
              </div>
            )}
          </div>

          <main>
            <PatientForm patientData={calc.patientData} updatePatient={calc.updatePatient} />
            <BodyVisualization skinAreas={calc.skinAreas} scalp={calc.scalp} mucosa={calc.mucosa} />
            <SkinTable skinAreas={calc.skinAreas} totals={calc.totals} updateSkin={calc.updateSkin} />
            <ScalpTable scalp={calc.scalp} totals={calc.totals} updateScalp={calc.updateScalp} />
            <MucosaTable mucosa={calc.mucosa} totals={calc.totals} updateMucosa={calc.updateMucosa} />
            <ResultsSummary totals={calc.totals} getSeverity={calc.getSeverity} />
            <Recommendations recommendations={calc.recommendations} setRecommendations={calc.setRecommendations} />
            <InfoSection />
          </main>

          <footer className="text-center text-gray-600 text-sm py-4 no-print">
            <p>{t('footer.copyright')}</p>
            <p className="mt-1 text-xs">{t('footer.medical')}</p>
          </footer>
        </div>
      </div>
    </>
  );
}
