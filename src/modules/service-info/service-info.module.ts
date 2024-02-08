import { Module } from '@nestjs/common';
import { ServiceInfoService } from './service-info.service';
import { ServiceInfoController } from './service-info.controller';

@Module({
  providers: [ServiceInfoService],
  controllers: [ServiceInfoController]
})
export class ServiceInfoModule {}
