import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  professionalEmail: string;

  @IsNotEmpty()
  companyName: string;
}
