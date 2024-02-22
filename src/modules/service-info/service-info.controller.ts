import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  CreateServiceInfoDto,
  CreateReportDto,
  SignReportDto,
} from './dtos/dto';
import { ServiceInfoService } from './service-info.service';
import {} from './dtos/sign-report.dto';
import { Request } from 'express';

@Controller('service-info')
export class ServiceInfoController {
  constructor(private readonly serviceInfoService: ServiceInfoService) {}

  @Post()
  async createServiceInfo(@Body() data: CreateServiceInfoDto) {
    await this.serviceInfoService.canSend(data.reportId);
    return await this.serviceInfoService.createServiceInfo(data);
  }

  @Get(':id')
  async getServiceInfo(@Param() param) {
    return await this.serviceInfoService.getServiceInfo(param.id);
  }

  @Post('report')
  async createReport(@Body() data: CreateReportDto) {
    return this.serviceInfoService.createReport(data);
  }

  @Get('report/:id')
  async canSend(@Param() param) {
    return this.serviceInfoService.canSend(param.id);
  }

  @Post('sign')
  async signDocument(@Req() request: Request, @Body() data: SignReportDto) {
    const userAgent = request.headers['user-agent'];
    const ipAddress = request.ip;

    const sensitiveInformation = {
      userAgent,
      ipAddress,
    };
    return this.serviceInfoService.signReport(data, sensitiveInformation);
  }

  @Get('report/pdf/:id')
  async getReportPdf(@Param('id') id: string, @Query('sign') sign: string) {
    return await this.serviceInfoService.getReportPDF(id, sign);
  }
  @Get('report/by/id/:id')
  async getById(@Param() query) {
    return await this.serviceInfoService.getReportById(query.id);
  }
}
