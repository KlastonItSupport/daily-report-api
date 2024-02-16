import { Controller, Get } from '@nestjs/common';
import { ProfessionalServices } from './professional.service';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professinalService: ProfessionalServices) {}

  @Get()
  async getProfessionals() {
    return this.professinalService.getProfessionals();
  }
}
