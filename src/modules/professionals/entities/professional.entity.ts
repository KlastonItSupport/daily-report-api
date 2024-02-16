import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('professionals')
export class ProfessionalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;
}
