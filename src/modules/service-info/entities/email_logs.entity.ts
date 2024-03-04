import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email_logs')
export class EmailLogsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'emails',
    type: 'varchar',
  })
  emails: string;

  @Column({
    name: 'service_info_id',
    type: 'varchar',
  })
  serviceInfoId: string;

  @Column({
    name: 'rejecteds',
    type: 'varchar',
  })
  rejecteds: string;

  @Column({
    name: 'sent_successfully',
    type: 'tinyint',
  })
  sentSuccessfully: number;
}
