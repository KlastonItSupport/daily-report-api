export const drawActivity = (doc: PDFKit.PDFDocument, squareY: number) => {
  const endTimeTextValue = 'Activity / Atividade';
  const endTimeTextValueX = 50;
  const endTimeTextValueY = squareY + 10;
  doc.font('Helvetica-Bold');

  doc.fontSize(8).text(endTimeTextValue, endTimeTextValueX, endTimeTextValueY);
  doc.font('Helvetica');
};

export const drawAudit = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareY: number,
  squareWidth: number,
  squareHeight: number,
  isSelected: boolean,
) => {
  const verticalAuditLeftLine = squareX + 95 + squareWidth * 0.2;

  doc
    .moveTo(verticalAuditLeftLine, squareY)
    .lineTo(verticalAuditLeftLine, squareY + squareHeight)
    .stroke();
  const verticalAuditRightLine = squareX + 120 + squareWidth * 0.2;

  doc
    .moveTo(verticalAuditRightLine, squareY)
    .lineTo(verticalAuditRightLine, squareY + squareHeight)
    .stroke();

  if (isSelected) {
    drawX(doc, squareX + 98 + squareWidth * 0.2, 253);
  }

  // --- Auditoria ---
  const auditText = 'Audit / Auditoria';
  const auditTextX = 150;
  const auditTextY = squareY + 10;
  doc.font('Helvetica-Bold');

  doc.fontSize(8).text(auditText, auditTextX, auditTextY);
  doc.font('Helvetica');
};

export const drawConsulting = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareY: number,
  squareWidth: number,
  squareHeight: number,
  isSelected: boolean,
) => {
  const consultingText = 'Consulting / Consultoria';
  const consultingTextX = 270;
  const consultingTextY = squareY + 10;
  doc.font('Helvetica-Bold');

  doc.fontSize(8).text(consultingText, consultingTextX, consultingTextY);
  doc.font('Helvetica');

  const verticalConsultingLeftLine = squareX + 230 + squareWidth * 0.2;

  doc
    .moveTo(verticalConsultingLeftLine, squareY)
    .lineTo(verticalConsultingLeftLine, squareY + squareHeight)
    .stroke();
  const verticalConsultingRightLine = squareX + 255 + squareWidth * 0.2;

  doc
    .moveTo(verticalConsultingRightLine, squareY)
    .lineTo(verticalConsultingRightLine, squareY + squareHeight)
    .stroke();
  if (isSelected) {
    drawX(doc, squareX + 233 + squareWidth * 0.2, 253);
  }
};

export const drawTraining = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareY: number,
  squareWidth: number,
  squareHeight: number,
  isSelected: boolean,
) => {
  const trainingText = 'Training / Treinamento';
  const trainingTextX = 405;
  const trainingTextY = squareY + 10;
  doc.font('Helvetica-Bold');

  doc.fontSize(8).text(trainingText, trainingTextX, trainingTextY);
  doc.font('Helvetica');

  const verticalTrainingLine = squareX + 385 + squareWidth * 0.2;
  doc
    .moveTo(verticalTrainingLine, squareY)
    .lineTo(verticalTrainingLine, squareY + squareHeight)
    .stroke();

  if (isSelected) {
    drawX(doc, squareX + 388 + squareWidth * 0.2, 253);
  }
};

export const drawX = (doc: PDFKit.PDFDocument, x: number, y: number) => {
  const armLength = 20;

  doc
    .moveTo(x, y)
    .lineTo(x + armLength, y + armLength)
    .stroke();

  doc
    .moveTo(x + armLength, y)
    .lineTo(x, y + armLength)
    .stroke();
};
