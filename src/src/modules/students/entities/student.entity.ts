import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassEntity } from '../../classes/entities/class.entity';

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

  @ManyToMany(() => ClassEntity, (classEntity) => classEntity.estudiantes)
  classes: ClassEntity[];
}
