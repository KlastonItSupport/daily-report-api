import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ConfigModule } from '@nestjs/config';
import { ProfessionalServices } from './professional.service';
import { ProfessionalEntity } from './entities/professional.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ProfessionalEntity]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalServices],
})
export class ProfessionalModule {}
