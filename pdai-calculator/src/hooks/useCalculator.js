import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { calculateTotals } from '../utils/calculator.js';

const STORAGE_KEY = 'pdai-calculator-data';
const MAX_HISTORY = 50;

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

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function useCalculator() {
  const saved = loadSaved();

  const [patientData, setPatientData] = useState(saved?.patientData || INITIAL_PATIENT);
  const [recommendations, setRecommendations] = useState(saved?.recommendations || '');
  const [skinAreas, setSkinAreas] = useState(saved?.skinAreas || INITIAL_SKIN);
  const [scalp, setScalp] = useState(saved?.scalp || INITIAL_SCALP);
  const [mucosa, setMucosa] = useState(saved?.mucosa || INITIAL_MUCOSA);

  // Undo history — only for score changes (skin, scalp, mucosa)
  const [history, setHistory] = useState([]);
  const isUndoing = useRef(false);

  const pushHistory = useCallback(() => {
    if (isUndoing.current) return;
    setHistory(prev => {
      const snapshot = { skinAreas, scalp, mucosa };
      const next = [...prev, snapshot];
      return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
    });
  }, [skinAreas, scalp, mucosa]);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const snapshot = newHistory.pop();
      isUndoing.current = true;
      setSkinAreas(snapshot.skinAreas);
      setScalp(snapshot.scalp);
      setMucosa(snapshot.mucosa);
      // Reset flag after state updates are flushed
      setTimeout(() => { isUndoing.current = false; }, 0);
      return newHistory;
    });
  }, []);

  const canUndo = history.length > 0;

  // Ctrl+Z global handler
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        // Don't intercept if focus is in text input/textarea
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        patientData, recommendations, skinAreas, scalp, mucosa,
      }));
    } catch { /* ignore */ }
  }, [patientData, recommendations, skinAreas, scalp, mucosa]);

  const totals = useMemo(() => calculateTotals(skinAreas, scalp, mucosa), [skinAreas, scalp, mucosa]);

  const updatePatient = (f, v) => setPatientData(p => ({ ...p, [f]: v }));

  const updateSkin = (area, field, value) => {
    pushHistory();
    const n = typeof value === 'number' ? value : (value === '' ? 0 : parseInt(value));
    setSkinAreas(p => ({ ...p, [area]: { ...p[area], [field]: isNaN(n) ? 0 : n } }));
  };

  const updateScalp = (field, value) => {
    pushHistory();
    const n = typeof value === 'number' ? value : (value === '' ? 0 : parseInt(value));
    setScalp(p => ({ ...p, [field]: isNaN(n) ? 0 : n }));
  };

  const updateMucosa = (area, value) => {
    pushHistory();
    const n = typeof value === 'number' ? value : (value === '' ? 0 : parseInt(value));
    setMucosa(p => ({ ...p, [area]: isNaN(n) ? 0 : n }));
  };

  const reset = () => {
    setPatientData(INITIAL_PATIENT);
    setRecommendations('');
    setSkinAreas(INITIAL_SKIN);
    setScalp(INITIAL_SCALP);
    setMucosa(INITIAL_MUCOSA);
    setHistory([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
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
    undo, canUndo,
  };
}

export const SKIN_KEYS = Object.keys(INITIAL_SKIN);
export const MUCOSA_KEYS = Object.keys(INITIAL_MUCOSA);
export const SCORES = [0, 1, 2, 3, 5, 10];
export const SCALP_SCORES = [0, 1, 2, 3, 4, 10];
export const LESION_COUNTS = [0, 1, 2, 3];
export const PIGMENTATION_SCORES = [0, 1];
