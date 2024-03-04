import { Repository } from 'typeorm';
import { EmailLogsEntity } from './entities/email_logs.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class EmailService {
  constructor(
    @InjectRepository(EmailLogsEntity)
    private readonly emailRepository: Repository<EmailLogsEntity>,
  ) {}

  async sentSuccessfully(mailerResponse) {
    const emailIsAccepted = mailerResponse.accepted.length > 0;
    const emailIsRejected = mailerResponse.rejected.length > 0;
    const hasMessageId = mailerResponse.messageId.length > 0;

    const sentSuccessfully =
      emailIsAccepted && !emailIsRejected && hasMessageId;

    const emailLog = await this.emailRepository.create({
      emails: mailerResponse.accepted.toString(),
      sentSuccessfully: sentSuccessfully ? 1 : 0,
      rejecteds: mailerResponse.rejected.toString(),
      serviceInfoId: mailerResponse.serviceInfoId,
    });

    await this.emailRepository.save(emailLog);
  }
}
