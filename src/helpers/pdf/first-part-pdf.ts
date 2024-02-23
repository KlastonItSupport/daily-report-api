import * as path from 'path';

export const firstThird = (doc: PDFKit.PDFDocument) => {
  const imagePath = path.resolve(__dirname, '../../../klastonblue.png');

  doc.image(imagePath, 45, 80, {
    width: 120,
    height: 40,
  });
};

export const secondThird = (doc: PDFKit.PDFDocument) => {
  // Desenha uma linha horizontal
  const horizontalLineY = 95;

  // Adiciona um texto um pouco acima da linha horizontal

  const textTitle = 'RELATÓRIO DIÁRIO ';
  const textTitleX = 70;
  const textTitleY = horizontalLineY + 25;

  doc.fontSize(15).text(textTitle, textTitleX, textTitleY, { align: 'center' });
  doc.font('Helvetica-Bold');

  const textSubTtile = 'Daily Report';
  const textSubTtileX = 70;
  const textSubTtileY = horizontalLineY + 40;

  doc
    .fontSize(10)
    .text(textSubTtile, textSubTtileX, textSubTtileY, { align: 'center' });
  doc.font('Helvetica');
};

export const ThirdThird = (
  doc: PDFKit.PDFDocument,
  squareY: number,
  squareX: number,
  squareHeight: number,
  squareWidth: number,
) => {
  const thirdhorizontalLineY = 95;
  doc
    .moveTo(180, thirdhorizontalLineY)
    .lineTo(squareX + squareWidth, thirdhorizontalLineY)
    .stroke();

  const secondHorizontalLineY = thirdhorizontalLineY + 25;
  doc
    .moveTo(400, secondHorizontalLineY)
    .lineTo(squareX + squareWidth, secondHorizontalLineY)
    .stroke();

  const thirdHorizontalLineY = thirdhorizontalLineY + 50;
  doc
    .moveTo(400, thirdHorizontalLineY)
    .lineTo(squareX + squareWidth, thirdHorizontalLineY)
    .stroke();

  // Adiciona um texto um pouco acima da linha horizontal
  const textLineOne = 'Revision date';
  const textLineOneX = 370;
  const textLineOneY = thirdhorizontalLineY - 15;

  doc.font('Helvetica-Oblique');
  doc
    .fontSize(9)
    .text(textLineOne, textLineOneX, textLineOneY, { align: 'center' });
  doc.font('Helvetica-Bold');

  // Segunda linha de texto
  const textLineTwo = '29/07/2022';
  const textLineTwoX = 370;
  const textLineTwoY = thirdhorizontalLineY + 10;

  doc.font('Helvetica-Oblique');
  doc
    .fontSize(9)
    .text(textLineTwo, textLineTwoX, textLineTwoY, { align: 'center' });
  doc.font('Helvetica-Bold');

  // Terceira linha de texto
  const textLineThree = 'Doc n.';
  const textLineThreeX = 370;
  const textLineThreeY = thirdhorizontalLineY + 35;

  doc.font('Helvetica-Oblique');
  doc
    .fontSize(9)
    .text(textLineThree, textLineThreeX, textLineThreeY, { align: 'center' });
  doc.font('Helvetica-Bold');

  // Quarta linha de texto
  const textLineFourth = 'KLA-GD-FORM-003';
  const textLineFourthX = 370;
  const textLineFourthY = thirdhorizontalLineY + 60;

  doc.font('Helvetica-Oblique');
  doc.fontSize(9).text(textLineFourth, textLineFourthX, textLineFourthY, {
    align: 'center',
  });
  doc.font('Helvetica-Bold');
};

export const fourthThird = (doc: PDFKit.PDFDocument) => {
  const thirdhorizontalLineY = 95;

  const secondTextLineOne = 'Pag.';
  const secondTextLineOneX = 500;
  const secondTextLineOneY = thirdhorizontalLineY - 15;

  doc.font('Helvetica-Oblique');
  doc
    .fontSize(9)
    .text(secondTextLineOne, secondTextLineOneX, secondTextLineOneY, {
      align: 'center',
    });
  doc.font('Helvetica-Bold');

  // Segunda linha
  const secondTextLineTwo = '1 de 1';
  const secondTextLineTwoX = 525;
  const secondTextLineTwoY = thirdhorizontalLineY + 10;

  doc.font('Helvetica-Oblique');
  doc
    .fontSize(9)
    .text(secondTextLineTwo, secondTextLineTwoX, secondTextLineTwoY, {
      align: 'center',
    });
  doc.font('Helvetica-Bold');

  // Terceira linha
  const thirdTextLineTwo = 'Rev.';
  const thirdTextLineTwoX = 525;
  const thirdTextLineTwoY = thirdhorizontalLineY + 35;

  doc.font('Helvetica-Oblique');
  doc.fontSize(9).text(thirdTextLineTwo, thirdTextLineTwoX, thirdTextLineTwoY, {
    align: 'center',
  });
  doc.font('Helvetica-Bold');

  // Quarta linha
  const fourthextLineTwo = '0';
  const fourthextLineTwoX = 525;
  const fourthextLineTwoY = thirdhorizontalLineY + 60;

  doc.font('Helvetica-Oblique');
  doc.fontSize(9).text(fourthextLineTwo, fourthextLineTwoX, fourthextLineTwoY, {
    align: 'center',
  });
  doc.font('Helvetica-Bold');
};
