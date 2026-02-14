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
