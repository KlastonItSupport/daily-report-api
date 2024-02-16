import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import {
  ThirdThird,
  firstThird,
  fourthThird,
  secondThird,
} from 'src/helpers/pdf/first-part-pdf';
import { CreateServiceInfoDto } from './dtos/create-info.dto';
import { firstLine, secondLine } from 'src/helpers/pdf/second-part-pdf';
import {
  drawActivity,
  drawAudit,
  drawConsulting,
  drawTraining,
} from 'src/helpers/pdf/third-part-pdf';

@Injectable()
export class PDFService {
  constructor() {}

  async generatePDF(serviceInfo: CreateServiceInfoDto): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
      });

      this.drawFirstPart(doc);
      this.drawSecondPart(doc, serviceInfo);
      this.drawThirdPart(doc, serviceInfo);
      this.drawFourthPart(doc, serviceInfo);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });
    return pdfBuffer;
  }

  drawBigSquare(
    doc: PDFKit.PDFDocument,
    squareX: number,
    squareY: number,
    squareWidth: number,
    squareHeight: number,
  ) {
    doc.fillOpacity(0.0);
    doc.fillColor('black');

    doc.rect(squareX, squareY, squareWidth, squareHeight);
    doc.fill();

    doc.fillOpacity(1);

    doc.strokeOpacity(1);
    doc.strokeColor('black');

    doc.rect(squareX, squareY, squareWidth, squareHeight);
    doc.stroke();
  }

  async drawFirstPart(doc: PDFKit.PDFDocument) {
    // Desenhando o grande quadrado
    const squareWidth = 515;
    const squareHeight = 100;
    const squareX = 40;
    const squareY = 75;

    this.drawBigSquare(doc, squareX, squareY, squareWidth, squareHeight);

    // Primeiro terço do quadrado
    const firstThirdCenterX = 180;
    const firstThirdStartY = squareY;
    const firstThirdEndY = squareY + squareHeight;

    firstThird(doc, firstThirdCenterX, firstThirdStartY, firstThirdEndY);
    doc
      .moveTo(firstThirdCenterX, firstThirdStartY)
      .lineTo(firstThirdCenterX, firstThirdEndY)
      .stroke();

    // --- Segundo terço do quadrado ---
    secondThird(doc, squareY, squareX, squareHeight, squareWidth);

    // --- Terceiro terço do quadrado ---
    ThirdThird(doc, squareY, squareX, squareHeight, squareWidth);

    // --- Quarto terço do quadrado ---
    fourthThird(doc);
  }

  async drawSecondPart(
    doc: PDFKit.PDFDocument,
    serviceInfo: CreateServiceInfoDto,
  ) {
    const squareWidth = 515;
    const squareHeight = 50;
    const squareX = 40;
    const squareY = 190;

    this.drawBigSquare(doc, squareX, squareY, squareWidth, squareHeight);

    const middleY = squareY + squareHeight / 2;

    doc
      .moveTo(squareX, middleY)
      .lineTo(squareX + squareWidth, middleY)
      .stroke();

    const verticalLine = squareX + squareWidth * 0.5;

    doc
      .moveTo(verticalLine, squareY)
      .lineTo(verticalLine, squareY + squareHeight)
      .stroke();

    firstLine(
      doc,
      squareY,
      verticalLine,
      squareHeight,
      serviceInfo.clientName,
      serviceInfo.startDate.toString(),
    );

    secondLine(
      doc,
      squareY,
      verticalLine,
      squareHeight,
      serviceInfo.startDate.toString(),
      serviceInfo.endDate.toString(),
    );
  }
  async drawThirdPart(
    doc: PDFKit.PDFDocument,
    serviceInfo: CreateServiceInfoDto,
  ) {
    const squareWidth = 515;
    const squareHeight = 25;
    const squareX = 40;
    const squareY = 250;

    this.drawBigSquare(doc, squareX, squareY, squareWidth, squareHeight);
    const verticalLine = squareX + squareWidth * 0.2;
    doc
      .moveTo(verticalLine, squareY)
      .lineTo(verticalLine, squareY + squareHeight)
      .stroke();

    drawActivity(doc, squareY);

    // TIPOS DE SERVIÇO
    // 1 - AUDITORIA
    // 2 - Consultoria
    // 3 - Treinamento
    drawAudit(
      doc,
      squareX,
      squareY,
      squareWidth,
      squareHeight,
      serviceInfo.serviceType == 1,
    );
    drawConsulting(
      doc,
      squareX,
      squareY,
      squareWidth,
      squareHeight,
      serviceInfo.serviceType == 2,
    );
    drawTraining(
      doc,
      squareX,
      squareY,
      squareWidth,
      squareHeight,
      serviceInfo.serviceType == 3,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawFourthPart(doc: PDFKit.PDFDocument, serviceInfo: CreateServiceInfoDto) {
    const squareWidth = 515;
    const squareHeight = 450;
    const squareX = 40;
    const squareY = 300;

    this.drawBigSquare(doc, squareX, squareY, squareWidth, squareHeight);

    const middleY = squareY + squareHeight / 2;

    doc
      .moveTo(squareX, middleY)
      .lineTo(squareX + squareWidth, middleY)
      .stroke();

    const JobDone = squareY + squareHeight / 20;

    doc
      .moveTo(squareX, JobDone)
      .lineTo(squareX + squareWidth, JobDone)
      .stroke();

    const textJobDone = 'Job done / Serviço executado';
    const textWidth = doc.widthOfString(textJobDone);
    const textX = squareX + (squareWidth - textWidth) / 2 - 10;
    const textY = JobDone - 15;

    doc.font('Helvetica-Bold').fontSize(10).text(textJobDone, textX, textY);

    const textSquareBelowJobDone = serviceInfo.executedService;
    const textSquareBelowJobDoneX = squareX + 10;
    const textSquareBelowJobDoneY = JobDone + squareHeight / 10 + 10 - 40;

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(
        textSquareBelowJobDone,
        textSquareBelowJobDoneX,
        textSquareBelowJobDoneY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 3,
        },
      );

    const PendenciesY = squareY + squareHeight / 2 - 20;

    doc
      .moveTo(squareX, PendenciesY)
      .lineTo(squareX + squareWidth, PendenciesY)
      .stroke();

    const textPendencies = 'Pending / Pendências';
    const textPendenciesX = squareWidth / 2;
    const textPendenciesY = PendenciesY + 6;

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(textPendencies, textPendenciesX, textPendenciesY, {
        width: squareWidth,
        lineGap: 3,
      });

    const PendenciesYEnd = squareY + squareHeight / 2 + 120;

    doc
      .moveTo(squareX, PendenciesYEnd)
      .lineTo(squareX + squareWidth, PendenciesYEnd)
      .stroke();

    const textSquareBelowPendencies = serviceInfo.pendencies;
    const textSquareBelowPendenciesX = squareX + 10;
    const textSquareBelowPendenciesY = PendenciesY + squareHeight / 10 - 15;

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(
        textSquareBelowPendencies,
        textSquareBelowPendenciesX,
        textSquareBelowPendenciesY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 3,
        },
      );

    const PlanningY = squareY + squareHeight / 2 + 140;

    doc
      .moveTo(squareX, PlanningY)
      .lineTo(squareX + squareWidth, PlanningY)
      .stroke();

    const textPlanning = 'Planning / Planejamento';
    const textPlanningX = squareWidth / 2;
    const textPlanningY = PlanningY - 13;

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(textPlanning, textPlanningX, textPlanningY, {
        width: squareWidth,
        lineGap: 3,
      });

    const textSquareBelowPlanning = serviceInfo.planning;
    const textSquareBelowPlanningX = squareX + 10;
    const textSquareBelowPlanningY = PlanningY + squareHeight / 10 - 40;

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(
        textSquareBelowPlanning,
        textSquareBelowPlanningX,
        textSquareBelowPlanningY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 3,
        },
      );
  }
}
