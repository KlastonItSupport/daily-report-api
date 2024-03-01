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
import { drawFourthPart } from 'src/helpers/pdf/fourth-part.pdf';

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
      drawFourthPart(doc, serviceInfo, shouldSign, sensitiveInfo);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    if (shouldSign) {
      const serviceInfoClient = await this.serviceInfoRepository.findOne({
        where: { id: serviceInfo.id },
      });

      serviceInfoClient.isSigned = true;
      await this.serviceInfoRepository.save(serviceInfoClient);
    }
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
}
