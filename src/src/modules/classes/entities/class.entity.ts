import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '../../students/entities/student.entity';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreClase: string;

  @Column()
  descripcionClase: string;

  @ManyToMany(() => StudentEntity, (student) => student.id, {
    eager: true,
  })
  @JoinTable()
  estudiantes: StudentEntity[];

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id, { eager: true })
  profesor: TeacherEntity;
}
