import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SKIN_KEYS, MUCOSA_KEYS } from '../hooks/useCalculator';

function getSeverityStyle(score) {
  if (score < 15) return { bg: '#dcfce7', color: '#15803d', border: '#86efac' };
  if (score <= 45) return { bg: '#fef9c3', color: '#a16207', border: '#facc15' };
  return { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' };
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function tableRow(cells, isHeader = false, bgColor = '') {
  const tag = isHeader ? 'th' : 'td';
  const bgStyle = bgColor ? `background:${bgColor};` : '';
  const fontWeight = isHeader || bgColor ? 'font-weight:bold;' : '';
  return `<tr style="${bgStyle}${fontWeight}">${cells.map((c, i) =>
    `<${tag} style="border:1px solid #aaa;padding:4px 5px;vertical-align:middle;line-height:1.4;${i > 0 ? 'text-align:center;' : ''}">${c}</${tag}>`
  ).join('')}</tr>`;
}

function zc(area) {
  if (area.erosions > 0) return '#ef4444';
  if (area.pigmentation > 0) return '#93c5fd';
  return '#d1d5db';
}

function mc(val) {
  return val > 0 ? '#ef4444' : '#d1d5db';
}

function buildVisualizationHTML(skinAreas, scalp, mucosa, t) {
  const S = '#6b7280';
  const G = '#e5e7eb';

  return `
    <div style="margin-bottom:8px;">
      <div style="font-size:11px;font-weight:bold;text-align:center;margin-bottom:4px;color:#312e81;">${esc(t('visualization.title'))}</div>
      <div style="display:flex;gap:6px;">
        <!-- Head -->
        <div style="flex:1;text-align:center;">
          <div style="font-size:9px;font-weight:bold;margin-bottom:2px;">${esc(t('visualization.head'))}</div>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:4px;padding:2px;">
            <svg viewBox="0 0 200 290" width="180" height="261">
              <path d="M 40 70 Q 100 30 160 70" fill="${scalp.erosions > 0 ? '#ef4444' : (scalp.pigmentation > 0 ? '#93c5fd' : '#9ca3af')}" stroke="${S}" stroke-width="1.5"/>
              <ellipse cx="100" cy="100" rx="60" ry="70" fill="${zc(skinAreas.face)}" stroke="${S}" stroke-width="2"/>
              <ellipse cx="38" cy="100" rx="10" ry="18" fill="${zc(skinAreas.ears)}" stroke="${S}" stroke-width="1.5"/>
              <ellipse cx="162" cy="100" rx="10" ry="18" fill="${zc(skinAreas.ears)}" stroke="${S}" stroke-width="1.5"/>
              <ellipse cx="78" cy="88" rx="10" ry="8" fill="white" stroke="${S}" stroke-width="1"/>
              <ellipse cx="122" cy="88" rx="10" ry="8" fill="white" stroke="${S}" stroke-width="1"/>
              <circle cx="78" cy="90" r="4" fill="#4b5563"/>
              <circle cx="122" cy="90" r="4" fill="#4b5563"/>
              <path d="M 100 100 L 94 120 L 100 123 L 106 120 Z" fill="${zc(skinAreas.nose)}" stroke="${S}" stroke-width="1"/>
              <path d="M 82 135 Q 100 145 118 135" fill="none" stroke="${S}" stroke-width="2"/>
              <rect x="82" y="170" width="36" height="40" rx="6" fill="${zc(skinAreas.neck)}" stroke="${S}" stroke-width="1.5"/>
              <text x="100" y="55" text-anchor="middle" font-size="9" fill="#374151" font-weight="500">${esc(t('scalp.title'))}</text>
              <text x="100" y="160" text-anchor="middle" font-size="8" fill="#374151">${esc(t('skin.face'))}</text>
              <text x="100" y="198" text-anchor="middle" font-size="8" fill="#374151">${esc(t('skin.neck'))}</text>
              <text x="100" y="225" text-anchor="middle" font-size="7" fill="#6b7280" font-weight="600">${esc(t('visualization.extraOral'))}</text>
              <rect x="5" y="233" width="56" height="18" rx="3" fill="${mc(mucosa.eyes)}" stroke="${S}" stroke-width="0.6"/>
              <text x="33" y="245" text-anchor="middle" font-size="6" fill="#374151">${esc(t('mucosa.eyes'))}</text>
              <rect x="72" y="233" width="56" height="18" rx="3" fill="${mc(mucosa.nose)}" stroke="${S}" stroke-width="0.6"/>
              <text x="100" y="245" text-anchor="middle" font-size="6" fill="#374151">${esc(t('mucosa.nose'))}</text>
              <rect x="139" y="233" width="56" height="18" rx="3" fill="${mc(mucosa.anogenital)}" stroke="${S}" stroke-width="0.6"/>
              <text x="167" y="245" text-anchor="middle" font-size="5.5" fill="#374151">${esc(t('mucosa.anogenital'))}</text>
            </svg>
          </div>
        </div>
        <!-- Oral -->
        <div style="flex:1;text-align:center;">
          <div style="font-size:9px;font-weight:bold;margin-bottom:2px;">${esc(t('visualization.oral'))}</div>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:4px;padding:2px;">
            <svg viewBox="0 0 200 200" width="180" height="180">
              <ellipse cx="100" cy="95" rx="80" ry="60" fill="${mc(mucosa.lips)}" stroke="${S}" stroke-width="2"/>
              <ellipse cx="100" cy="95" rx="64" ry="48" fill="#fecaca" stroke="${S}" stroke-width="1"/>
              <path d="M 45 65 Q 100 42 155 65" fill="${mc(mucosa.hardPalate)}" stroke="${S}" stroke-width="1.2"/>
              <text x="100" y="58" text-anchor="middle" font-size="7" fill="#374151">${esc(t('mucosa.hardPalate'))}</text>
              <path d="M 52 68 Q 100 56 148 68" fill="${mc(mucosa.softPalate)}" stroke="${S}" stroke-width="1"/>
              <text x="100" y="74" text-anchor="middle" font-size="6" fill="#374151">${esc(t('mucosa.softPalate'))}</text>
              <path d="M 42 72 Q 100 64 158 72 L 154 79 Q 100 71 46 79 Z" fill="${mc(mucosa.upperGingiva)}" stroke="${S}" stroke-width="0.8"/>
              <ellipse cx="100" cy="82" rx="12" ry="8" fill="${mc(mucosa.pharynx)}" stroke="${S}" stroke-width="0.8"/>
              <ellipse cx="46" cy="98" rx="14" ry="22" fill="${mc(mucosa.buccal)}" stroke="${S}" stroke-width="0.8"/>
              <ellipse cx="154" cy="98" rx="14" ry="22" fill="${mc(mucosa.buccal)}" stroke="${S}" stroke-width="0.8"/>
              <ellipse cx="100" cy="105" rx="34" ry="20" fill="${mc(mucosa.tongue)}" stroke="${S}" stroke-width="1.2"/>
              <text x="100" y="109" text-anchor="middle" font-size="7" fill="#374151">${esc(t('mucosa.tongue'))}</text>
              <path d="M 72 125 Q 100 136 128 125" fill="${mc(mucosa.floorOfMouth)}" stroke="${S}" stroke-width="0.8"/>
              <path d="M 46 130 Q 100 140 154 130 L 158 137 Q 100 147 42 137 Z" fill="${mc(mucosa.lowerGingiva)}" stroke="${S}" stroke-width="0.8"/>
              <text x="100" y="158" text-anchor="middle" font-size="6" fill="#374151">${esc(t('mucosa.lips'))}</text>
            </svg>
          </div>
        </div>
        <!-- Body -->
        <div style="flex:1;text-align:center;">
          <div style="font-size:9px;font-weight:bold;margin-bottom:2px;">${esc(t('visualization.body'))}</div>
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:4px;padding:2px;">
            <svg viewBox="0 0 200 280" width="180" height="252">
              <path d="M 70 10 L 70 120 Q 70 130 80 130 L 120 130 Q 130 130 130 120 L 130 10 Z" fill="${G}" stroke="${S}" stroke-width="1.5"/>
              <rect x="74" y="14" width="52" height="45" rx="6" fill="${zc(skinAreas.chest)}" stroke="${S}" stroke-width="1" opacity="0.85"/>
              <text x="100" y="42" text-anchor="middle" font-size="8" fill="#374151">${esc(t('skin.chest'))}</text>
              <rect x="74" y="63" width="52" height="45" rx="6" fill="${zc(skinAreas.abdomen)}" stroke="${S}" stroke-width="1" opacity="0.85"/>
              <text x="100" y="90" text-anchor="middle" font-size="8" fill="#374151">${esc(t('skin.abdomen'))}</text>
              <ellipse cx="100" cy="125" rx="10" ry="6" fill="${zc(skinAreas.genitals)}" stroke="${S}" stroke-width="0.8"/>
              <rect x="30" y="14" width="22" height="75" rx="10" fill="${zc(skinAreas.arms)}" stroke="${S}" stroke-width="1.5"/>
              <rect x="148" y="14" width="22" height="75" rx="10" fill="${zc(skinAreas.arms)}" stroke="${S}" stroke-width="1.5"/>
              <rect x="32" y="93" width="18" height="22" rx="5" fill="${zc(skinAreas.hands)}" stroke="${S}" stroke-width="1"/>
              <rect x="150" y="93" width="18" height="22" rx="5" fill="${zc(skinAreas.hands)}" stroke="${S}" stroke-width="1"/>
              <rect x="72" y="136" width="24" height="90" rx="10" fill="${zc(skinAreas.legs)}" stroke="${S}" stroke-width="1.5"/>
              <rect x="104" y="136" width="24" height="90" rx="10" fill="${zc(skinAreas.legs)}" stroke="${S}" stroke-width="1.5"/>
              <rect x="68" y="230" width="30" height="16" rx="5" fill="${zc(skinAreas.feet)}" stroke="${S}" stroke-width="1"/>
              <text x="83" y="241" text-anchor="middle" font-size="6" fill="#374151">${esc(t('skin.feet'))}</text>
              <rect x="102" y="230" width="30" height="16" rx="5" fill="${zc(skinAreas.feet)}" stroke="${S}" stroke-width="1"/>
              <rect x="140" y="140" width="52" height="20" rx="4" fill="${zc(skinAreas.back)}" stroke="${S}" stroke-width="0.8"/>
              <text x="166" y="153" text-anchor="middle" font-size="7" fill="#374151" font-weight="500">${esc(t('skin.back'))}</text>
              <line x1="140" y1="150" x2="132" y2="100" stroke="${S}" stroke-width="0.6" stroke-dasharray="3,2"/>
            </svg>
          </div>
        </div>
      </div>
      <!-- Legend -->
      <div style="display:flex;justify-content:center;gap:12px;margin-top:3px;font-size:8px;color:#6b7280;">
        <span><span style="display:inline-block;width:10px;height:10px;background:#d1d5db;border:1px solid #6b7280;border-radius:2px;vertical-align:middle;margin-right:2px;"></span>${esc(t('visualization.normal'))}</span>
        <span><span style="display:inline-block;width:10px;height:10px;background:#ef4444;border-radius:2px;vertical-align:middle;margin-right:2px;"></span>${esc(t('visualization.affected'))}</span>
        <span><span style="display:inline-block;width:10px;height:10px;background:#93c5fd;border-radius:2px;vertical-align:middle;margin-right:2px;"></span>${esc(t('visualization.pigmentation'))}</span>
      </div>
    </div>
  `;
}

function buildHTML(data) {
  const { patientData, skinAreas, scalp, mucosa, totals, recommendations, t } = data;
  const sev = getSeverityStyle(totals.overallSeverity);

  const getSevLabel = (score, t) => {
    if (score < 15) return t('results.mild');
    if (score <= 45) return t('results.moderate');
    return t('results.severe');
  };

  // Patient info row
  const patientParts = [];
  if (patientData.fullName) patientParts.push(`<b>${esc(t('patient.fullName'))}:</b> ${esc(patientData.fullName)}`);
  if (patientData.birthYear) patientParts.push(`<b>${esc(t('patient.birthYear'))}:</b> ${esc(patientData.birthYear)}`);
  if (patientData.diagnosis) patientParts.push(`<b>${esc(t('patient.diagnosis'))}:</b> ${esc(patientData.diagnosis)}`);
  if (patientData.immunofluorescence) patientParts.push(`<b>${esc(t('patient.immunofluorescence'))}:</b> ${esc(patientData.immunofluorescence)}`);

  // Skin rows
  const skinRows = SKIN_KEYS.map(k =>
    tableRow([esc(t(`skin.${k}`)), skinAreas[k].erosions, skinAreas[k].lesionCount, skinAreas[k].pigmentation])
  ).join('');

  // Mucosa rows
  const mucosaRows = MUCOSA_KEYS.map(k =>
    tableRow([esc(t(`mucosa.${k}`)), mucosa[k]])
  ).join('');

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#111;line-height:1.35;width:750px;padding:16px 20px;background:#fff;">

      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2.5px solid #333;padding-bottom:7px;margin-bottom:10px;">
        <b style="font-size:14px;">PDAI Calculator &mdash; Pemphigus Disease Area Index</b>
        <span style="font-size:10px;color:#555;">${esc(t('printHeader'))} ${new Date().toLocaleDateString()}</span>
      </div>

      ${patientParts.length ? `<div style="margin-bottom:10px;font-size:10px;color:#333;">${patientParts.join(' &nbsp;|&nbsp; ')}</div>` : ''}

      ${buildVisualizationHTML(skinAreas, scalp, mucosa, t)}

      <!-- SKIN -->
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;font-weight:bold;margin-bottom:4px;color:#312e81;">${esc(t('skin.title'))}</div>
        <table style="width:100%;border-collapse:collapse;font-size:10px;">
          ${tableRow([esc(t('skin.colLocation')), esc(t('skin.colErosions')), esc(t('skin.colLesionCount')), esc(t('skin.colPigmentation'))], true, '#e0e7ff')}
          ${skinRows}
          ${tableRow([esc(t('skin.totalSkin')), totals.skinErosions, totals.skinLesionCount.toFixed(1), totals.skinPigmentation], false, '#c7d2fe')}
        </table>
      </div>

      <!-- SCALP -->
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;font-weight:bold;margin-bottom:4px;color:#312e81;">${esc(t('scalp.title'))}</div>
        <table style="width:100%;border-collapse:collapse;font-size:10px;">
          ${tableRow([esc(t('scalp.colScalp')), esc(t('scalp.colErosions')), esc(t('scalp.colLesionCount')), esc(t('scalp.colPigmentation'))], true, '#e0e7ff')}
          ${tableRow([esc(t('scalp.colScalp')), scalp.erosions, scalp.lesionCount, scalp.pigmentation])}
          ${tableRow([esc(t('scalp.totalScalp')), totals.scalpErosions, totals.scalpLesionCount.toFixed(1), totals.scalpPigmentation], false, '#c7d2fe')}
        </table>
      </div>

      <!-- MUCOSA -->
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;font-weight:bold;margin-bottom:4px;color:#312e81;">${esc(t('mucosa.title'))}</div>
        <table style="width:100%;border-collapse:collapse;font-size:10px;">
          ${tableRow([esc(t('mucosa.colLocation')), esc(t('mucosa.colErosions'))], true, '#e0e7ff')}
          ${mucosaRows}
          ${tableRow([esc(t('mucosa.totalMucosa')), totals.mucosaTotal], false, '#c7d2fe')}
        </table>
      </div>

      <!-- RESULTS -->
      <div style="background:linear-gradient(135deg,#4338ca,#7c3aed);color:#fff;padding:10px 12px;border-radius:6px;margin-bottom:8px;">
        <div style="font-size:12px;font-weight:bold;text-align:center;margin-bottom:8px;">${esc(t('results.title'))}</div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;background:rgba(255,255,255,0.18);padding:7px;border-radius:4px;">
            <div style="font-size:8px;opacity:0.85;">${esc(t('results.severity'))}</div>
            <div style="font-size:18px;font-weight:bold;margin:2px 0;">${totals.overallSeverity.toFixed(1)}</div>
            <div style="font-size:7px;opacity:0.65;">${esc(t('results.severityMax'))}</div>
          </div>
          <div style="flex:1;background:rgba(255,255,255,0.18);padding:7px;border-radius:4px;">
            <div style="font-size:8px;opacity:0.85;">${esc(t('results.damage'))}</div>
            <div style="font-size:18px;font-weight:bold;margin:2px 0;">${totals.overallDamage}</div>
            <div style="font-size:7px;opacity:0.65;">${esc(t('results.damageMax'))}</div>
          </div>
          <div style="flex:1;background:rgba(255,255,255,0.18);padding:7px;border-radius:4px;">
            <div style="font-size:8px;opacity:0.85;">${esc(t('results.total'))}</div>
            <div style="font-size:18px;font-weight:bold;margin:2px 0;">${totals.totalScore.toFixed(1)}</div>
            <div style="font-size:7px;opacity:0.65;">${esc(t('results.totalMax'))}</div>
          </div>
          <div style="flex:1;background:${sev.bg};color:${sev.color};padding:7px;border-radius:4px;border:2px solid ${sev.border};">
            <div style="font-size:8px;">${esc(t('results.level'))}</div>
            <div style="font-size:12px;font-weight:bold;margin-top:3px;">${esc(getSevLabel(totals.overallSeverity, t))}</div>
          </div>
        </div>
      </div>

      ${recommendations.trim() ? `
      <!-- RECOMMENDATIONS -->
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;font-weight:bold;margin-bottom:4px;color:#312e81;">${esc(t('recommendations.title'))}</div>
        <div style="border:1px solid #ccc;padding:6px 8px;font-size:10px;white-space:pre-wrap;word-wrap:break-word;border-radius:4px;line-height:1.4;">${esc(recommendations)}</div>
      </div>
      ` : ''}

      <!-- FOOTER -->
      <div style="text-align:center;font-size:8px;color:#888;border-top:1px solid #ddd;padding-top:5px;margin-top:4px;">
        ${esc(t('footer.copyright'))} &nbsp;|&nbsp; ${esc(t('footer.medical'))}
      </div>
    </div>
  `;
}

export async function generatePDF(data) {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1;';
  container.innerHTML = buildHTML(data);
  document.body.appendChild(container);

  try {
    const content = container.firstElementChild;
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    let imgW = maxW;
    let imgH = (canvas.height * maxW) / canvas.width;

    // Fit to one page
    if (imgH > maxH) {
      const ratio = maxH / imgH;
      imgW *= ratio;
      imgH = maxH;
    }

    const xOffset = margin + (maxW - imgW) / 2;
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', xOffset, margin, imgW, imgH);

    const name = data.patientData.fullName
      ? `_${data.patientData.fullName.trim().replace(/\s+/g, '_')}`
      : '';
    pdf.save(`PDAI${name}_${new Date().toISOString().slice(0, 10)}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
