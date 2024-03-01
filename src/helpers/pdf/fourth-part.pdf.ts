import { ServiceInfoEntity } from 'src/modules/service-info/entities/service_info.entity';

export const drawFourthPart = (
  doc: PDFKit.PDFDocument,
  serviceInfo: ServiceInfoEntity,
  shouldSign: boolean,
  sensitiveInfo = null,
) => {
  const squareWidth = 515;
  const squareHeight = 450;
  const squareX = 40;
  const squareY = 300;

  const jobDoneHeight = drawJobDone(
    doc,
    squareX,
    squareY,
    squareWidth,
    squareHeight,
    serviceInfo,
  );

  drawPendencies(
    doc,
    squareX,
    squareWidth,
    squareHeight,
    serviceInfo,
    jobDoneHeight,
  );
  doc.addPage();

  const textPlanningHeight = drawPlanning(
    doc,
    squareX,
    squareWidth,
    squareHeight,
    serviceInfo,
  );
  signDocument(doc, serviceInfo, shouldSign, sensitiveInfo, textPlanningHeight);
};

const drawJobDone = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareY: number,
  squareWidth: number,
  squareHeight: number,
  serviceInfo: ServiceInfoEntity,
) => {
  const textJobDone = 'Job done / Serviço executado';
  const textWidth = doc.widthOfString(textJobDone);
  const textX = squareX + (squareWidth - textWidth) / 2 - 10;
  const jobDone = squareY + squareHeight / 20;
  const textY = jobDone - 25;

  drawBigSquare(doc, squareX, textY - 10, squareWidth, 20);

  doc
    .font('Helvetica-Bold')
    .text(textJobDone, textX, textY - 3)
    .fontSize(14);

  const textJobDoneDescription = serviceInfo.executedService;
  const textJobDoneDescriptionOptions: PDFKit.Mixins.TextOptions = {
    width: squareWidth - 20,
    align: 'left',
  };
  doc.fontSize(textJobDoneDescription.length > 1500 ? 7 : 8);
  const textJobDoneHeight = doc.heightOfString(
    textJobDoneDescription,
    textJobDoneDescriptionOptions,
  );

  doc
    .font('Helvetica')
    .text(
      textJobDoneDescription,
      squareX + 10,
      textY + 20,
      textJobDoneDescriptionOptions,
    );

  drawBigSquare(doc, squareX, textY + 10, squareWidth, textJobDoneHeight + 10);

  // Retornar a posição final vertical do texto "Serviço executado"
  return textY + textJobDoneHeight + 10;
};

const drawPendencies = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareWidth: number,
  squareHeight: number,
  serviceInfo: ServiceInfoEntity,
  jobDoneHeight: number,
) => {
  const textPendenciesTitle = 'Pending / Pendências';
  const textWidth = doc.widthOfString(textPendenciesTitle);
  const textX = squareX + (squareWidth - textWidth) / 2 - 10;
  const textY = jobDoneHeight + 20;

  doc
    .font('Helvetica-Bold')
    .text(textPendenciesTitle, textX, textY - 3)
    .fontSize(14);

  drawBigSquare(doc, squareX, textY - 10, squareWidth, 20);

  const textPendencies = serviceInfo.pendencies;
  const textPendenciesOptions: PDFKit.Mixins.TextOptions = {
    width: squareWidth - 20,
    align: 'left',
  };
  doc.fontSize(textPendencies.length > 1500 ? 7 : 8);
  const textPendenciesHeight = doc.heightOfString(
    textPendencies,
    textPendenciesOptions,
  );

  doc
    .font('Helvetica')
    .text(textPendencies, squareX + 10, textY + 20, textPendenciesOptions);

  drawBigSquare(
    doc,
    squareX,
    textY + 10,
    squareWidth,
    textPendenciesHeight + 10,
  );
};

const drawPlanning = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareWidth: number,
  squareHeight: number,
  serviceInfo: ServiceInfoEntity,
): number => {
  const textPlanningTitle = 'Planning / Planejamento';
  const textWidth = doc.widthOfString(textPlanningTitle);
  const textPlanningX = squareX + (squareWidth - textWidth) / 2 - 10;
  const textPlanningY = 15;

  doc
    .font('Helvetica-Bold')
    .text(textPlanningTitle, textPlanningX, textPlanningY);

  drawBigSquare(doc, squareX, 10, squareWidth, 20);

  const textPlanningDescription = serviceInfo.planning;
  const textPlanningDescriptionOptions: PDFKit.Mixins.TextOptions = {
    width: squareWidth - 20,
    align: 'left',
  };
  doc.fontSize(9);
  const textPlanningHeight = doc.heightOfString(
    textPlanningDescription,
    textPlanningDescriptionOptions,
  );

  doc
    .font('Helvetica')
    .fontSize(9)
    .text(
      textPlanningDescription,
      squareX + 10,
      textPlanningY + 22,
      textPlanningDescriptionOptions,
    );

  drawBigSquare(
    doc,
    squareX,
    textPlanningY + 16,
    squareWidth,
    textPlanningHeight + 10,
  );

  return textPlanningHeight;
};

const signDocument = async (
  doc: PDFKit.PDFDocument,
  serviceInfo: ServiceInfoEntity,
  shouldSign: boolean,
  sensitiveInfo = null,
  textPlanningHeight: number,
) => {
  const squareWidth = 515;
  const squareHeight = 30;
  const squareX = 40;
  const squareY = textPlanningHeight + 45;

  drawBigSquare(doc, squareX, squareY + 140, squareWidth, squareHeight);

  const textContent = "Customer's signature / Assinatura do Cliente";
  const textX = squareX + 10;
  const textY = squareY + 147;

  const middleX = squareX + squareWidth / 2.5;
  const startY = squareY + 140;
  const endY = squareY + 140 + squareHeight;

  doc.moveTo(middleX, startY).lineTo(middleX, endY).stroke();

  doc.font('Helvetica-Bold').fontSize(9).text(textContent, textX, textY);
  if (shouldSign) {
    const imagePath = `${process.env.UPLOAD_FOLDER_PATH}/signature-${serviceInfo.id}.png`;
    const imageX = middleX + 20;
    const imageY = squareY + 140;
    const imageWidth = 150;
    const imageHeight = 27;

    doc.image(imagePath, imageX, imageY, {
      width: imageWidth,
      height: imageHeight,
    });

    if (sensitiveInfo) {
      const textSensitiveInfo = 'Informações sensíveis';
      const textSensitiveInfoTextX = squareX + 10;
      const textSensitiveInfoTextY = squareY + 30;

      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text(
          textSensitiveInfo,
          textSensitiveInfoTextX,
          textSensitiveInfoTextY,
        );

      const userAgentText = 'User Agent:';
      const userAgentTextX = squareX + 10;
      const userAgentTextY = squareY + 70;

      doc
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(userAgentText, userAgentTextX, userAgentTextY);

      const userAgentDescription = sensitiveInfo.userAgent;
      const userAgentDescriptionX = squareX + 80;
      const userAgentDescriptionY = squareY + 70;

      doc
        .font('Helvetica')
        .fontSize(10)
        .text(
          userAgentDescription,
          userAgentDescriptionX,
          userAgentDescriptionY,
        );

      // --- IP ---
      const ipText = 'Ip:';
      const ipTextX = squareX + 10;
      const ipTextY = squareY + 100;

      doc.font('Helvetica-Bold').fontSize(10).text(ipText, ipTextX, ipTextY);

      const ipDescription = sensitiveInfo.ipAddress;
      const ipDescriptionX = squareX + 80;
      const ipDescriptionY = squareY + 100;

      doc
        .font('Helvetica')
        .fontSize(10)
        .text(ipDescription, ipDescriptionX, ipDescriptionY);
    }
  }
};

const drawBigSquare = (
  doc: PDFKit.PDFDocument,
  squareX: number,
  squareY: number,
  squareWidth: number,
  squareHeight: number,
) => {
  doc.fillOpacity(0.0);
  doc.fillColor('black');

  doc.rect(squareX, squareY, squareWidth, squareHeight);
  doc.fill();

  doc.fillOpacity(1);

  doc.strokeOpacity(1);
  doc.strokeColor('black');

  doc.rect(squareX, squareY, squareWidth, squareHeight);
  doc.stroke();
};
