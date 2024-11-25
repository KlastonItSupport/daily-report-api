import { Controller, Get, Query } from '@nestjs/common';
import { ExcelFilterService } from '../services/excel-filter.service';

@Controller('kcertifications/certificates')
export class ExcelFilterController {
  constructor(private readonly excelFilterServices: ExcelFilterService) {}

  @Get()
  async getCertifications(@Query('search') search: string) {
    return await this.excelFilterServices.getCertifications(search);
  }
}
