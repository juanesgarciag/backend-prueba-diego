import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { ClassEntity } from '../classes/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, ClassEntity])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TypeOrmModule],
})
export class TeachersModule {}
