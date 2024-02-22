import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('reports')
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'professional_email', type: 'varchar' })
  professionalEmail: string;

  @Column({ name: 'company_name', type: 'varchar' })
  companyName: string;

  @Column({ name: 'was_sent' })
  wasSent: boolean;
}
