import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;
}
