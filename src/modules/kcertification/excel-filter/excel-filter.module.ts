import { Module } from '@nestjs/common';
import { ExcelFilterService } from './services/excel-filter.service';
import { ExcelFilterController } from './controllers/excel-filter.controller';

@Module({
  providers: [ExcelFilterService],
  controllers: [ExcelFilterController],
})
export class ExcelFilterModule {}
