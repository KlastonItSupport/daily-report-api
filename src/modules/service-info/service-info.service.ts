import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { CreateServiceInfoDto } from './dtos/create-info.dto';

@Injectable()
export class ServiceInfoService {
  constructor(
    @InjectRepository(ServiceInfoEntity)
    private readonly serviceInfoRepository: Repository<ServiceInfoEntity>,
    private mailerService: MailerService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createServiceInfo(data: CreateServiceInfoDto) {
    // const serviceInfo = await this.serviceInfoRepository.create(data);
    // await this.serviceInfoRepository.save(serviceInfo);
    return await this.mailerService.sendMail({
      to: 'it.support@klaston.com',
      from: 'go8895806@gmail.com',
      subject: 'Enviando Email com NestJS',
      html: `teste`,
      attachments: [
        {
          filename: 'teste.txt',
          content: 'aaaa',
        },
      ],
    });
    return 'serviceInfo';
  }
}
