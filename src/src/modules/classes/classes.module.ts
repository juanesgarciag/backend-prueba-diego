import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { TeacherEntity } from '../teachers/entities/teacher.entity';
import { StudentEntity } from '../students/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassEntity, TeacherEntity, StudentEntity]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [TypeOrmModule],
})
export class ClassesModule {}
