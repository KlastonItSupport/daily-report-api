import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfessionalEntity } from './entities/professional.entity';

@Injectable()
export class ProfessionalServices {
  constructor(
    @InjectRepository(ProfessionalEntity)
    private readonly professionalRepository: Repository<ProfessionalEntity>,
  ) {}

  getProfessionals() {
    return 'aaa';
  }
}
