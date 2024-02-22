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
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ name: 'service_date', type: 'date' })
  serviceDate: string;

  @Column({ name: 'service_type', type: 'tinyint', nullable: true })
  serviceType: number;

  @Column({ name: 'executed_service', type: 'varchar' })
  executedService: string;

  @Column({ name: 'pendencies', type: 'varchar' })
  pendencies: string;

  @Column({ name: 'planning', type: 'varchar' })
  planning: string;

  @Column({ name: 'is_signed', type: 'boolean' })
  isSigned: boolean;
}
