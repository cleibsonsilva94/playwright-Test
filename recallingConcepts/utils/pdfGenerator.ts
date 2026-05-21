// utils/pdfGenerator.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';

export function gerarPdf(imagens: string[], output = 'relatorio.pdf') {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(output));

  imagens.forEach((img, index) => {
    doc.text(`Passo ${index + 1}`, { align: 'center' });
    doc.image(img, {
      fit: [500, 400],
      align: 'center',
    });
    doc.addPage();
  });

  doc.end();
}