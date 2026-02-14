import { useState, useMemo } from 'react';

const INITIAL_SKIN = {
  ears: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  nose: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  face: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  neck: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  chest: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  abdomen: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  back: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  arms: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  hands: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  legs: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  feet: { erosions: 0, pigmentation: 0, lesionCount: 0 },
  genitals: { erosions: 0, pigmentation: 0, lesionCount: 0 },
};

const INITIAL_SCALP = { erosions: 0, pigmentation: 0, lesionCount: 0 };

const INITIAL_MUCOSA = {
  eyes: 0, nose: 0, buccal: 0, hardPalate: 0, softPalate: 0,
  upperGingiva: 0, lowerGingiva: 0, tongue: 0, floorOfMouth: 0,
  lips: 0, pharynx: 0, anogenital: 0,
};

const INITIAL_PATIENT = { fullName: '', birthYear: '', diagnosis: '', immunofluorescence: '' };

function calculateLesionScore(count) {
  if (count === 1) return 1;
  if (count === 2) return 1.3;
  if (count === 3) return 1.6;
  return 0;
}

export function useCalculator() {
  const [patientData, setPatientData] = useState(INITIAL_PATIENT);
  const [recommendations, setRecommendations] = useState('');
  const [skinAreas, setSkinAreas] = useState(INITIAL_SKIN);
  const [scalp, setScalp] = useState(INITIAL_SCALP);
  const [mucosa, setMucosa] = useState(INITIAL_MUCOSA);

  const totals = useMemo(() => {
    const se = Object.values(skinAreas).reduce((s, a) => s + a.erosions, 0);
    const sp = Object.values(skinAreas).reduce((s, a) => s + a.pigmentation, 0);
    const sl = Object.values(skinAreas).reduce((s, a) => s + calculateLesionScore(a.lesionCount), 0);
    const mt = Object.values(mucosa).reduce((s, v) => s + v, 0);
    const scl = calculateLesionScore(scalp.lesionCount);
    const os = se + sl + scalp.erosions + scl + mt;
    const od = sp + scalp.pigmentation;
    return {
      skinErosions: se, skinPigmentation: sp, skinLesionCount: sl,
      scalpErosions: scalp.erosions, scalpPigmentation: scalp.pigmentation,
      scalpLesionCount: scl, mucosaTotal: mt, overallSeverity: os,
      overallDamage: od, totalScore: os + od,
    };
  }, [skinAreas, scalp, mucosa]);

  const updatePatient = (f, v) => setPatientData(p => ({ ...p, [f]: v }));

  const updateSkin = (area, field, value) => {
    const n = value === '' ? 0 : parseInt(value);
    setSkinAreas(p => ({ ...p, [area]: { ...p[area], [field]: isNaN(n) ? 0 : n } }));
  };

  const updateScalp = (field, value) => {
    const n = value === '' ? 0 : parseInt(value);
    setScalp(p => ({ ...p, [field]: isNaN(n) ? 0 : n }));
  };

  const updateMucosa = (area, value) => {
    const n = value === '' ? 0 : parseInt(value);
    setMucosa(p => ({ ...p, [area]: isNaN(n) ? 0 : n }));
  };

  const reset = () => {
    setPatientData(INITIAL_PATIENT);
    setRecommendations('');
    setSkinAreas(INITIAL_SKIN);
    setScalp(INITIAL_SCALP);
    setMucosa(INITIAL_MUCOSA);
  };

  const getSeverity = (score, t) => {
    if (score < 15) return { level: t('results.mild'), color: 'text-green-700 bg-green-50 border-green-300', iconType: 'check' };
    if (score <= 45) return { level: t('results.moderate'), color: 'text-yellow-700 bg-yellow-50 border-yellow-300', iconType: 'alert' };
    return { level: t('results.severe'), color: 'text-red-700 bg-red-50 border-red-300', iconType: 'x' };
  };

  return {
    patientData, recommendations, skinAreas, scalp, mucosa, totals,
    updatePatient, updateSkin, updateScalp, updateMucosa,
    setRecommendations, reset, getSeverity,
  };
}

export const SKIN_KEYS = Object.keys(INITIAL_SKIN);
export const MUCOSA_KEYS = Object.keys(INITIAL_MUCOSA);
export const SCORES = [0, 1, 2, 3, 5, 10];
export const SCALP_SCORES = [0, 1, 2, 3, 4, 10];
