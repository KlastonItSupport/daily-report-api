import { convertingDate } from '../format';

export const firstLine = (
  doc: PDFKit.PDFDocument,
  squareY: number,
  verticalLine: number,
  squareHeight: number,
  clientName: string,
  startDate: string,
) => {
  const clientText = 'Client / Cliente:';
  const clientTextX = -365;
  const clientTextY = squareY + 10;

  doc
    .fontSize(9)
    .text(clientText, clientTextX, clientTextY, { align: 'center' });
  doc.font('Helvetica');

  doc
    .moveTo(verticalLine, squareY)
    .lineTo(verticalLine, squareY + squareHeight)
    .stroke();

  const clientTextValue = clientName;
  const clientTextValueX = 115;
  const clientTextValueY = squareY + 10;

  doc.fontSize(8).text(clientTextValue, clientTextValueX, clientTextValueY);
  doc.font('Helvetica-Bold');

  // DATA
  const dateText = 'Data / Date:';
  const dateTextX = 135;
  const dateTextY = squareY + 10;

  doc.fontSize(9).text(dateText, dateTextX, dateTextY, { align: 'center' });
  doc.font('Helvetica');

  doc
    .moveTo(verticalLine, squareY)
    .lineTo(verticalLine, squareY + squareHeight)
    .stroke();

  const dateTextValue = convertingDate(startDate);
  const dateTextValueX = 357;
  const dateTextValueY = squareY + 10;

  doc.fontSize(8).text(dateTextValue, dateTextValueX, dateTextValueY);
  doc.font('Helvetica');
};

export const secondLine = (
  doc: PDFKit.PDFDocument,
  squareY: number,
  verticalLine: number,
  squareHeight: number,
  startTime: string,
  endTime: string,
) => {
  const startTimeText = 'Start time / Hr inicio:';
  const startTimeTextX = -351;
  const startTimeTextY = squareY + 33;

  doc.font('Helvetica-Bold');
  doc
    .fontSize(8)
    .text(startTimeText, startTimeTextX, startTimeTextY, { align: 'center' });
  doc.font('Helvetica');

  const startTimeTextValue = startTime;
  const startTimeTextValueX = 129;
  const startTimeTextValueY = squareY + 33;

  doc
    .fontSize(8)
    .text(startTimeTextValue, startTimeTextValueX, startTimeTextValueY);
  doc.font('Helvetica');

  const endTimeText = 'End time / Hr término:';
  const endTimeTextX = 305;
  const endTimeTextY = squareY + 33;

  doc.font('Helvetica-Bold');
  doc.fontSize(8).text(endTimeText, endTimeTextX, endTimeTextY);
  doc.font('Helvetica');

  const endTimeTextValue = endTime;
  const endTimeTextValueX = 393;
  const endTimeTextValueY = squareY + 33;

  doc.fontSize(8).text(endTimeTextValue, endTimeTextValueX, endTimeTextValueY);
  doc.font('Helvetica');
};
