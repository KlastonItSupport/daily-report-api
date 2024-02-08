import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services_info')
export class ServiceInfoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'professional_name', type: 'varchar' })
  professionalName: string;

  @Column({ name: 'professional_email', type: 'varchar' })
  professionalEmail: string;

  @Column({ name: 'client_name', type: 'varchar' })
  clientName: string;

  @Column({ name: 'client_email', type: 'varchar' })
  clientEmail: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'service_type', type: 'tinyint', nullable: true })
  serviceType: number;

  @Column({ name: 'service_price', type: 'varchar' })
  servicePrice: string;

  @Column({ name: 'executed_service', type: 'varchar' })
  executedService: string;

  @Column({ name: 'pendencies', type: 'varchar' })
  pendencies: string;

  @Column({ name: 'planning', type: 'varchar' })
  planning: string;
}
