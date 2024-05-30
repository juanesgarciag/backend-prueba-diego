import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassEntity } from '../../classes/entities/class.entity';

@Entity('teachers')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.profesor)
  classes: ClassEntity[];
}
