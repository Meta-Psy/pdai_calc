import { useTranslation } from 'react-i18next';

export default function PatientForm({ patientData, updatePatient }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-6" aria-labelledby="patient-title">
      <h2 id="patient-title" className="text-2xl font-bold mb-4">{t('patient.title')}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold mb-2">{t('patient.fullName')}</label>
          <input id="fullName" type="text" value={patientData.fullName} onChange={e => updatePatient('fullName', e.target.value)} placeholder={t('patient.fullNamePlaceholder')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="birthYear" className="block text-sm font-semibold mb-2">{t('patient.birthYear')}</label>
          <input id="birthYear" type="text" value={patientData.birthYear} onChange={e => updatePatient('birthYear', e.target.value)} placeholder={t('patient.birthYearPlaceholder')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="diagnosis" className="block text-sm font-semibold mb-2">{t('patient.diagnosis')}</label>
          <input id="diagnosis" type="text" value={patientData.diagnosis} onChange={e => updatePatient('diagnosis', e.target.value)} placeholder={t('patient.diagnosisPlaceholder')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="immunofluorescence" className="block text-sm font-semibold mb-2">{t('patient.immunofluorescence')}</label>
          <select id="immunofluorescence" value={patientData.immunofluorescence} onChange={e => updatePatient('immunofluorescence', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">{t('patient.selectPlaceholder')}</option>
            <option value="0">{t('patient.ifNone')}</option>
            <option value="+">{t('patient.ifWeak')}</option>
            <option value="++">{t('patient.ifModerate')}</option>
            <option value="+++">{t('patient.ifStrong')}</option>
          </select>
        </div>
      </div>
    </section>
  );
}
