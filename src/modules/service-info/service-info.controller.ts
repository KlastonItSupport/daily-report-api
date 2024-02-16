import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateServiceInfoDto } from './dtos/create-info.dto';
import { ServiceInfoService } from './service-info.service';

@Controller('service-info')
export class ServiceInfoController {
  constructor(private readonly serviceInfoService: ServiceInfoService) {}

  @Post()
  async createServiceInfo(@Body() data: CreateServiceInfoDto) {
    return await this.serviceInfoService.createServiceInfo(data);
  }

  @Get()
  async getServiceInfo() {
    return await this.serviceInfoService.getServiceInfo();
  }
}
