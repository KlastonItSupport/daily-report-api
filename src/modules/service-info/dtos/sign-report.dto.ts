import { IsNotEmpty } from 'class-validator';

export class SignReportDto {
  @IsNotEmpty()
  imageDataURL: string;

  @IsNotEmpty()
  reportId: string;
}
