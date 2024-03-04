// src/modules/nome-do-modulo/dtos/service-info.dto.ts

import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateServiceInfoDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  professionalName: string;

  @IsNotEmpty()
  @IsEmail()
  professionalEmail: string;

  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  @IsDate()
  endDate: string;

  @IsNotEmpty()
  @IsDate()
  serviceDate: string;

  @IsOptional()
  @IsInt()
  serviceType?: number;

  @IsNotEmpty()
  @IsString()
  executedService: string;

  @IsNotEmpty()
  @IsString()
  pendencies: string;

  @IsNotEmpty()
  @IsString()
  planning: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  professionalId: string;

  @IsNotEmpty()
  reportId: string;
}
