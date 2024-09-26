import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { CreateServiceInfoDto, SignReportDto } from './dtos/dto';
import { PDFService } from './pdfs.service';
import { AppError } from 'src/errors/app-error';
import { FileService } from './files.service';
import { User } from '../users/entities/user.entity';
import { EmailService } from './email.service';
import { S3Service } from './s3.service';

@Injectable()
export class ServiceInfoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ServiceInfoEntity)
    private readonly serviceInfoRepository: Repository<ServiceInfoEntity>,
    private mailerService: MailerService,
    private pdfService: PDFService,
    private readonly fileService: FileService,
    private readonly emailService: EmailService,
    private readonly s3Service: S3Service,
  ) {}

  async createServiceInfo(data: CreateServiceInfoDto) {
    const serviceInfo = await this.serviceInfoRepository.create(data);
    await this.serviceInfoRepository.save(serviceInfo);
    const pdfBuffer = await this.pdfService.generatePDF(serviceInfo, false);

    const linkToSign = `${process.env.FRONT_LINK}/sign/document/${serviceInfo.id}`;

    const promises = [
      this.mailerService.sendMail({
        bcc: process.env.EMAIL_USER,
        to: data.clientEmail,
        from: process.env.EMAIL_USER,
        subject: 'Daily report',
        html: `<p> Olá, ${serviceInfo.clientName}.</p></br> 
       <p>Segue o daily report de nossos serviços prestados deste dia.</p></br>
       <a href="${linkToSign}">Clique aqui</a> para assinar o documento`,
        attachments: [
          {
            filename: `${serviceInfo.clientName}.pdf`,
            contentType: 'application/pdf',
            content: pdfBuffer,
          },
        ],
      }),

      await this.mailerService.sendMail({
        bcc: process.env.EMAIL_USER,
        to:
          process.env.ENVIRONMENT == 'TEST'
            ? ['it.support@klaston.com']
            : [
                'it.support@klaston.com',
                'natacha.partner@klaston.com',
                'tamara@klaston.com',
              ],
        from: process.env.EMAIL_USER,
        subject: 'Daily report - Gerado pelo Consultor',
        html: `<p> Olá, o colaborador ${serviceInfo.professionalName} acabou de gerar um daily report para a empresa ${serviceInfo.clientName} que está pronto para assinatura do cliente.</p></br>
       `,
        attachments: [
          {
            filename: `${serviceInfo.clientName}.pdf`,
            contentType: 'application/pdf',
            content: pdfBuffer,
          },
        ],
      }),
    ];

    const responses = await Promise.all(promises);

    for (const response of responses) {
      await this.emailService.sentSuccessfully({
        ...response,
        serviceInfoId: serviceInfo.id,
      });
    }
    await this.s3Service.uploadFile(pdfBuffer, serviceInfo.id);
    return responses;
  }

  async getServiceInfo(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user && user.permission == 'user') {
      return await this.serviceInfoRepository.find({
        where: { professionalEmail: user.email },
        order: { createdAt: 'desc' },
      });
    }
    return await this.serviceInfoRepository.find({
      order: { createdAt: 'desc' },
      take: 150,
    });
  }

  async signReport(data: SignReportDto, sensitiveInformation) {
    const serviceInfo = await this.serviceInfoRepository.findOne({
      where: { id: data.reportId },
    });

    if (serviceInfo.isSigned) {
      throw new AppError('This contract cant be signed more than once ', 401);
    }
    await this.fileService.createFIle(data.imageDataURL, data.reportId);

    const pdfBuffer = await this.pdfService.generatePDF(
      serviceInfo,
      true,
      sensitiveInformation,
    );

    const promisesEmail = [
      this.mailerService.sendMail({
        bcc: process.env.EMAIL_USER,
        to: serviceInfo.clientEmail,
        from: process.env.EMAIL_USER,
        subject: 'Daily report',
        html: `<p> Olá ${serviceInfo.clientName}, segue o documento do daily report assinado para seu controle.</p>`,
        attachments: [
          {
            filename: `${serviceInfo.clientName}.pdf`,
            contentType: 'application/pdf',
            content: pdfBuffer,
          },
        ],
      }),

      this.mailerService.sendMail({
        bcc: process.env.EMAIL_USER,
        to: serviceInfo.professionalEmail,
        from: process.env.EMAIL_USER,
        subject: 'Daily report',
        html: `<p> Olá ${serviceInfo.professionalName}, segue o documento do daily report assinado pela empresa para seu controle.</p>`,
        attachments: [
          {
            filename: `${serviceInfo.clientName}.pdf`,
            contentType: 'application/pdf',
            content: pdfBuffer,
          },
        ],
      }),

      this.mailerService.sendMail({
        bcc: process.env.EMAIL_USER,
        to:
          process.env.ENVIRONMENT == 'TEST'
            ? ['it.support@klaston.com']
            : [
                'it.support@klaston.com',
                'natacha.partner@klaston.com',
                'tamara@klaston.com',
              ],
        from: process.env.EMAIL_USER,
        subject: ` Daily report - Assinado - ${serviceInfo.clientName}`,
        html: `<p> Olá Klaston Managment, segue o documento do daily report assinado pela empresa para seu controle.</p>`,
        attachments: [
          {
            filename: `${serviceInfo.clientName}.pdf`,
            contentType: 'application/pdf',
            content: pdfBuffer,
          },
        ],
      }),
    ];
    const responses = await Promise.all(promisesEmail);

    for (const response of responses) {
      await this.emailService.sentSuccessfully({
        ...response,
        serviceInfoId: serviceInfo.id,
      });
    }
    await this.s3Service.uploadFile(pdfBuffer, serviceInfo.id + '-signed');
    await this.fileService.deleteFile(data.reportId);
    return {
      filename: `${serviceInfo.clientName}.pdf`,
      buffer: pdfBuffer,
    };
  }

  async getReportPDF(id: string, sign: string) {
    const shouldSign = sign === 'true' ? true : false;
    const serviceInfo = await this.serviceInfoRepository.findOne({
      where: { id: id },
    });

    if (!serviceInfo) {
      throw new NotFoundException('Service Info not found');
    }

    const pdfBuffer = await this.pdfService.generatePDF(
      serviceInfo,
      shouldSign,
    );

    return {
      filename: `${serviceInfo.clientName}.pdf`,
      buffer: pdfBuffer,
    };
  }

  async getReportById(id: string) {
    const serviceInfo = await this.serviceInfoRepository.findOne({
      where: { id: id },
    });

    if (!serviceInfo) {
      throw new NotFoundException('Service Info not found');
    }
    return serviceInfo;
  }
}
