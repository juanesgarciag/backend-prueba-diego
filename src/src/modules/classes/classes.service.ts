import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { StudentEntity } from '../students/entities/student.entity';
import { TeacherEntity } from '../teachers/entities/teacher.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRespository: Repository<ClassEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private readonly teacherRepository: Repository<TeacherEntity>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const teacher = await this.teacherRepository.findOneBy({
      email: createClassDto.profesor.email,
    });

    if (!teacher) {
      throw new BadRequestException(
        'El profesor no se encuentra en la base de datos',
      );
    } else {
      createClassDto.profesor = teacher;
    }

    const students = await Promise.all(
      createClassDto.estudiantes.map(async (studentId) => {
        const student = await this.studentRepository.findOneBy({
          email: studentId.email,
        });
        if (!student) {
          throw new BadRequestException(
            `El estudiante con email ${studentId.email} no se encuentra en la base de datos`,
          );
        }
        return student;
      }),
    );

    if (students.length) {
      createClassDto.estudiantes = students;
    }

    return await this.classRespository.save(createClassDto);
  }

  async findAll() {
    return await this.classRespository.find();
  }

  async findOne(id: number) {
    return await this.classRespository.findBy({ id });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    return await this.classRespository.update({ id }, updateClassDto);
  }

  async remove(id: number) {
    return await this.classRespository.delete({ id });
  }
}
