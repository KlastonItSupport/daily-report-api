import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { CreateServiceInfoDto } from './dtos/create-info.dto';
import { PDFService } from './pdfs.service';

@Injectable()
export class ServiceInfoService {
  constructor(
    @InjectRepository(ServiceInfoEntity)
    private readonly serviceInfoRepository: Repository<ServiceInfoEntity>,
    private mailerService: MailerService,
    private pdfService: PDFService,
  ) {}

  async createServiceInfo(data: CreateServiceInfoDto) {
    const serviceInfo = await this.serviceInfoRepository.create(data);
    await this.serviceInfoRepository.save(serviceInfo);
    const pdfBuffer = await this.pdfService.generatePDF(serviceInfo);

    return await this.mailerService.sendMail({
      to: 'it.support@klaston.com',
      from: 'go8895806@gmail.com',
      subject: 'Daily report',
      html: `<p> Olá ${serviceInfo.clientName}, segue o daily report de nossos serviços prestados deste dia</p>`,
      attachments: [
        {
          filename: `${serviceInfo.clientName}.pdf`,
          contentType: 'application/pdf',
          content: pdfBuffer,
        },
      ],
    });
  }

  async getServiceInfo() {
    return await this.serviceInfoRepository.find();
  }
}
