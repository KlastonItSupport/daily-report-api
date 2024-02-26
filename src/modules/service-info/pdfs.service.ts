import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { firstThird, secondThird } from 'src/helpers/pdf/first-part-pdf';
import { firstLine, secondLine } from 'src/helpers/pdf/second-part-pdf';
import {
  drawActivity,
  drawAudit,
  drawConsulting,
  drawTraining,
} from 'src/helpers/pdf/third-part-pdf';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PDFService {
  constructor(
    @InjectRepository(ServiceInfoEntity)
    private readonly serviceInfoRepository: Repository<ServiceInfoEntity>,
  ) {}

  async generatePDF(
    serviceInfo: ServiceInfoEntity,
    shouldSign: boolean,
    sensitiveInfo = null,
  ): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
      });

      this.drawFirstPart(doc);
      this.drawSecondPart(doc, serviceInfo);
      this.drawThirdPart(doc, serviceInfo);
      this.drawFourthPart(doc, serviceInfo);
      this.signDocument(doc, serviceInfo, shouldSign, sensitiveInfo);

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
    firstThird(doc);
    // --- Segundo terço do quadrado ---
    secondThird(doc);
  }

  async drawSecondPart(
    doc: PDFKit.PDFDocument,
    serviceInfo: ServiceInfoEntity,
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
      serviceInfo.serviceDate.toString(),
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
  async drawThirdPart(doc: PDFKit.PDFDocument, serviceInfo: ServiceInfoEntity) {
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
  drawFourthPart(doc: PDFKit.PDFDocument, serviceInfo: ServiceInfoEntity) {
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
      .fontSize(9)
      .text(
        textSquareBelowJobDone,
        textSquareBelowJobDoneX,
        textSquareBelowJobDoneY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 0.1,
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
      .fontSize(8)
      .text(
        textSquareBelowPendencies,
        textSquareBelowPendenciesX,
        textSquareBelowPendenciesY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 0.1,
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
      .fontSize(9)
      .text(textPlanning, textPlanningX, textPlanningY, {
        width: squareWidth,
        lineGap: 3,
      });

    const textSquareBelowPlanning = serviceInfo.planning;
    const textSquareBelowPlanningX = squareX + 10;
    const textSquareBelowPlanningY = PlanningY + squareHeight / 10 - 40;

    doc
      .font('Helvetica')
      .fontSize(8)
      .text(
        textSquareBelowPlanning,
        textSquareBelowPlanningX,
        textSquareBelowPlanningY,
        {
          width: squareWidth - 20,
          align: 'left',
          lineGap: 0.1,
        },
      );
  }

  // ...

  async signDocument(
    doc: PDFKit.PDFDocument,
    serviceInfo: ServiceInfoEntity,
    shouldSign: boolean,
    sensitiveInfo = null,
  ) {
    const squareWidth = 515;
    const squareHeight = 30;
    const squareX = 40;
    const squareY = 753;

    this.drawBigSquare(doc, squareX, squareY, squareWidth, squareHeight);

    const verticalLine = squareX + squareWidth * 0.42;

    doc
      .moveTo(verticalLine, squareY)
      .lineTo(verticalLine, squareY + squareHeight)
      .stroke();

    const textContent = "Customer's signature / Assinatura do Cliente";
    const textX = squareX + 10;
    const textY = squareY + 4;

    doc.font('Helvetica-Bold').fontSize(9).text(textContent, textX, textY);
    if (shouldSign) {
      const imagePath = `${process.env.UPLOAD_FOLDER_PATH}/signature-${serviceInfo.id}.png`;
      const imageX = verticalLine + 20;
      const imageY = squareY;
      const imageWidth = 150;
      const imageHeight = 27;

      doc.image(imagePath, imageX, imageY, {
        width: imageWidth,
        height: imageHeight,
      });

      if (sensitiveInfo) {
        const textSensitiveInfo = 'Informações sensíveis';
        const textSensitiveInfoTextX = squareX + 10;
        const textSensitiveInfoTextY = squareY + 20;

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
        const userAgentTextY = squareY - 650;

        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .text(userAgentText, userAgentTextX, userAgentTextY);

        const userAgentDescription = sensitiveInfo.userAgent;
        const userAgentDescriptionX = squareX + 80;
        const userAgentDescriptionY = squareY - 650;

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
        const ipTextY = squareY - 600;

        doc.font('Helvetica-Bold').fontSize(10).text(ipText, ipTextX, ipTextY);

        const ipDescription = sensitiveInfo.ipAddress;
        const ipDescriptionX = squareX + 80;
        const ipDescriptionY = squareY - 600;

        doc
          .font('Helvetica')
          .fontSize(10)
          .text(ipDescription, ipDescriptionX, ipDescriptionY);
      }
      const serviceInfoClient = await this.serviceInfoRepository.findOne({
        where: { id: serviceInfo.id },
      });

      serviceInfoClient.isSigned = true;
      await this.serviceInfoRepository.save(serviceInfoClient);
    }
  }
}
