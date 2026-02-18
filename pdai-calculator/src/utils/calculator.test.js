import { describe, it, expect } from 'vitest';
import { calculateLesionScore, calculateTotals, getSeverityLevel } from './calculator.js';

// ── Lesion Score ──

describe('calculateLesionScore', () => {
  it('returns 0 for count 0', () => {
    expect(calculateLesionScore(0)).toBe(0);
  });

  it('returns 1 for count 1', () => {
    expect(calculateLesionScore(1)).toBe(1);
  });

  it('returns 1.3 for count 2', () => {
    expect(calculateLesionScore(2)).toBe(1.3);
  });

  it('returns 1.6 for count 3', () => {
    expect(calculateLesionScore(3)).toBe(1.6);
  });

  it('returns 0 for values > 3', () => {
    expect(calculateLesionScore(4)).toBe(0);
    expect(calculateLesionScore(10)).toBe(0);
  });
});

// ── Helpers ──

function emptySkin() {
  const keys = ['ears', 'nose', 'face', 'neck', 'chest', 'abdomen', 'back', 'arms', 'hands', 'legs', 'feet', 'genitals'];
  return Object.fromEntries(keys.map(k => [k, { erosions: 0, pigmentation: 0, lesionCount: 0 }]));
}

function emptyMucosa() {
  const keys = ['eyes', 'nose', 'buccal', 'hardPalate', 'softPalate', 'upperGingiva', 'lowerGingiva', 'tongue', 'floorOfMouth', 'lips', 'pharynx', 'anogenital'];
  return Object.fromEntries(keys.map(k => [k, 0]));
}

const emptyScalp = { erosions: 0, pigmentation: 0, lesionCount: 0 };

// ── calculateTotals ──

describe('calculateTotals', () => {
  it('returns all zeros for empty inputs', () => {
    const t = calculateTotals(emptySkin(), emptyScalp, emptyMucosa());
    expect(t.skinErosions).toBe(0);
    expect(t.skinPigmentation).toBe(0);
    expect(t.skinLesionCount).toBe(0);
    expect(t.scalpErosions).toBe(0);
    expect(t.scalpPigmentation).toBe(0);
    expect(t.scalpLesionCount).toBe(0);
    expect(t.mucosaTotal).toBe(0);
    expect(t.overallSeverity).toBe(0);
    expect(t.overallDamage).toBe(0);
    expect(t.totalScore).toBe(0);
  });

  it('sums skin erosions across all areas', () => {
    const skin = emptySkin();
    skin.face.erosions = 5;
    skin.chest.erosions = 3;
    const t = calculateTotals(skin, emptyScalp, emptyMucosa());
    expect(t.skinErosions).toBe(8);
  });

  it('sums skin pigmentation across all areas', () => {
    const skin = emptySkin();
    skin.arms.pigmentation = 1;
    skin.legs.pigmentation = 1;
    skin.back.pigmentation = 1;
    const t = calculateTotals(skin, emptyScalp, emptyMucosa());
    expect(t.skinPigmentation).toBe(3);
    expect(t.overallDamage).toBe(3);
  });

  it('calculates skin lesion count scores with 1/1.3/1.6 weights', () => {
    const skin = emptySkin();
    skin.face.lesionCount = 1;   // → 1
    skin.chest.lesionCount = 2;  // → 1.3
    skin.back.lesionCount = 3;   // → 1.6
    const t = calculateTotals(skin, emptyScalp, emptyMucosa());
    expect(t.skinLesionCount).toBeCloseTo(3.9); // 1 + 1.3 + 1.6
  });

  it('calculates scalp scores', () => {
    const scalp = { erosions: 4, pigmentation: 1, lesionCount: 2 };
    const t = calculateTotals(emptySkin(), scalp, emptyMucosa());
    expect(t.scalpErosions).toBe(4);
    expect(t.scalpPigmentation).toBe(1);
    expect(t.scalpLesionCount).toBe(1.3);
  });

  it('sums mucosa scores', () => {
    const mucosa = emptyMucosa();
    mucosa.eyes = 5;
    mucosa.buccal = 10;
    mucosa.lips = 3;
    const t = calculateTotals(emptySkin(), emptyScalp, mucosa);
    expect(t.mucosaTotal).toBe(18);
  });

  it('computes overallSeverity = skinErosions + skinLesionCount + scalpErosions + scalpLesionCount + mucosaTotal', () => {
    const skin = emptySkin();
    skin.face.erosions = 10;     // se = 10
    skin.face.lesionCount = 1;   // sl = 1
    const scalp = { erosions: 3, pigmentation: 0, lesionCount: 1 }; // scl = 1
    const mucosa = emptyMucosa();
    mucosa.lips = 5;             // mt = 5
    const t = calculateTotals(skin, scalp, mucosa);
    // os = 10 + 1 + 3 + 1 + 5 = 20
    expect(t.overallSeverity).toBe(20);
  });

  it('computes overallDamage = skinPigmentation + scalpPigmentation', () => {
    const skin = emptySkin();
    skin.face.pigmentation = 1;
    skin.hands.pigmentation = 1;
    const scalp = { erosions: 0, pigmentation: 1, lesionCount: 0 };
    const t = calculateTotals(skin, scalp, emptyMucosa());
    // od = 2 + 1 = 3
    expect(t.overallDamage).toBe(3);
  });

  it('computes totalScore = overallSeverity + overallDamage', () => {
    const skin = emptySkin();
    skin.face.erosions = 10;
    skin.face.pigmentation = 1;
    skin.face.lesionCount = 3; // 1.6
    const scalp = { erosions: 4, pigmentation: 1, lesionCount: 2 }; // scl = 1.3
    const mucosa = emptyMucosa();
    mucosa.buccal = 10;
    const t = calculateTotals(skin, scalp, mucosa);
    // os = 10 + 1.6 + 4 + 1.3 + 10 = 26.9
    // od = 1 + 1 = 2
    // total = 28.9
    expect(t.overallSeverity).toBeCloseTo(26.9);
    expect(t.overallDamage).toBe(2);
    expect(t.totalScore).toBeCloseTo(28.9);
  });

  it('handles maximum severity scenario', () => {
    const skin = emptySkin();
    // All 12 areas: erosions=10, pigmentation=1, lesionCount=3
    for (const key of Object.keys(skin)) {
      skin[key] = { erosions: 10, pigmentation: 1, lesionCount: 3 };
    }
    const scalp = { erosions: 10, pigmentation: 1, lesionCount: 3 };
    const mucosa = emptyMucosa();
    for (const key of Object.keys(mucosa)) {
      mucosa[key] = 10;
    }
    const t = calculateTotals(skin, scalp, mucosa);
    // se = 12 * 10 = 120
    // sl = 12 * 1.6 = 19.2
    // scalp.erosions = 10, scl = 1.6
    // mt = 12 * 10 = 120
    // os = 120 + 19.2 + 10 + 1.6 + 120 = 270.8
    // sp = 12 * 1 = 12, scalp.pigmentation = 1
    // od = 12 + 1 = 13
    // total = 283.8
    expect(t.skinErosions).toBe(120);
    expect(t.skinLesionCount).toBeCloseTo(19.2);
    expect(t.mucosaTotal).toBe(120);
    expect(t.overallSeverity).toBeCloseTo(270.8);
    expect(t.overallDamage).toBe(13);
    expect(t.totalScore).toBeCloseTo(283.8);
  });
});

// ── Severity Level ──

describe('getSeverityLevel', () => {
  it('returns mild for score < 15', () => {
    expect(getSeverityLevel(0)).toBe('mild');
    expect(getSeverityLevel(14)).toBe('mild');
    expect(getSeverityLevel(14.9)).toBe('mild');
  });

  it('returns moderate for score 15-45', () => {
    expect(getSeverityLevel(15)).toBe('moderate');
    expect(getSeverityLevel(30)).toBe('moderate');
    expect(getSeverityLevel(45)).toBe('moderate');
  });

  it('returns severe for score > 45', () => {
    expect(getSeverityLevel(45.1)).toBe('severe');
    expect(getSeverityLevel(100)).toBe('severe');
    expect(getSeverityLevel(283.8)).toBe('severe');
  });
});
