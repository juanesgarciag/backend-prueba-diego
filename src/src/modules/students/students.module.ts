import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { ClassEntity } from '../classes/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, ClassEntity])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [TypeOrmModule],
})
export class StudentsModule {}
