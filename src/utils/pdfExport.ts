import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ScriptProject } from '../types/script';

export async function exportToPDF(project: ScriptProject): Promise<void> {
  const printContainer = document.createElement('div');
  printContainer.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: 794px;
    background: white;
    color: black;
    font-family: 'Noto Nastaliq Urdu', serif;
    padding: 60px 80px;
    direction: rtl;
  `;

  // Title Page
  const titlePage = `
    <div style="text-align: center; padding: 100px 0; border-bottom: 2px solid #333; margin-bottom: 40px;">
      <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px; direction: rtl;">${project.urduTitle || project.title}</h1>
      <p style="font-size: 16px; color: #666; margin-bottom: 8px; direction: rtl;">${project.title}</p>
      <p style="font-size: 14px; margin-bottom: 8px; direction: rtl;">مصنف: ${project.author}</p>
      <p style="font-size: 12px; color: #999;">${project.type} | ${project.genre}</p>
      <p style="font-size: 12px; color: #999; margin-top: 20px;">${new Date(project.createdAt).toLocaleDateString('ur-PK')}</p>
    </div>
  `;

  // Script Elements
  const elementsHTML = project.elements
    .filter(el => el.type !== 'note')
    .map(el => {
      const styles: Record<string, string> = {
        'scene-heading': 'font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #999; padding-bottom: 4px; margin-bottom: 8px; font-size: 13px; color: #000;',
        'action': 'font-size: 12px; color: #222; line-height: 1.8; margin-bottom: 12px;',
        'character': 'font-weight: bold; text-align: center; font-size: 13px; margin-bottom: 4px; color: #000;',
        'dialogue': 'font-size: 12px; margin: 0 80px 12px; line-height: 1.8; color: #111;',
        'parenthetical': 'font-style: italic; text-align: center; font-size: 11px; color: #555; margin-bottom: 4px;',
        'transition': 'text-align: left; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #333; margin: 16px 0;',
        'shot': 'font-weight: bold; text-transform: uppercase; font-size: 12px; color: #444; margin-bottom: 8px;',
      };

      return `<div style="${styles[el.type] || ''} direction: rtl; margin-bottom: 8px;">${el.content}</div>`;
    })
    .join('');

  printContainer.innerHTML = `
    <div style="direction: rtl; font-family: 'Noto Nastaliq Urdu', 'Arial', serif;">
      ${titlePage}
      <div style="line-height: 2; direction: rtl;">
        ${elementsHTML}
      </div>
      <div style="text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #999;">
        حرفِ آخر - Harf-e-Akhir | ${project.wordCount} الفاظ | ${project.pageCount} صفحات
      </div>
    </div>
  `;

  document.body.appendChild(printContainer);

  try {
    const canvas = await html2canvas(printContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const filename = `${project.title || project.urduTitle || 'script'}_harf-e-akhir.pdf`;
    pdf.save(filename);
  } finally {
    document.body.removeChild(printContainer);
  }
}

export function saveProjectAsJSON(project: ScriptProject): void {
  const json = JSON.stringify(project, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.title || 'script'}_harf-e-akhir.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function loadProjectFromJSON(file: File): Promise<ScriptProject> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data as ScriptProject);
      } catch (err) {
        reject(new Error('Invalid script file'));
      }
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsText(file);
  });
}
