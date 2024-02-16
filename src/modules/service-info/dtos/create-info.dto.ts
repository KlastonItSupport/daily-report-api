// src/modules/nome-do-modulo/dtos/service-info.dto.ts

import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsInt,
  IsDecimal,
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
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsInt()
  serviceType?: number;

  @IsNotEmpty()
  @IsDecimal()
  servicePrice: string;

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
}
