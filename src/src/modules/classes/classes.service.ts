import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './entities/class.entity';
import { Repository } from 'typeorm';
import { StudentEntity } from '../students/entities/student.entity';
import { TeacherEntity } from '../teachers/entities/teacher.entity';
import { CreateStudentDto } from '../students/dto/create-student.dto';

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
    await this.validateClasses(id);
    return await this.classRespository.findBy({ id });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    await this.validateClasses(id);
    try {
      await this.validateClasses(id);
      const classToUpdate = await this.classRespository.findOneBy({ id });
      if (updateClassDto.profesor) {
        const teacher = await this.teacherRepository.findOneBy({
          email: updateClassDto.profesor.email,
        });
        if (!teacher) {
          throw new BadRequestException(
            'El profesor no se encuentra en la base de datos',
          );
        }
        classToUpdate.profesor = teacher;
      }
      classToUpdate.nombreClase =
        updateClassDto.nombreClase ?? classToUpdate.nombreClase;
      classToUpdate.descripcionClase =
        updateClassDto.descripcionClase ?? classToUpdate.descripcionClase;

      await this.classRespository.save(classToUpdate);

      if (updateClassDto.estudiantes) {
        const students = await this.mapStudents(updateClassDto.estudiantes);
        classToUpdate.estudiantes = students;
        await this.classRespository.save(classToUpdate);

        return classToUpdate;
      }
    } catch (error) {
      throw new BadRequestException(
        error.message ?? 'Error al actualizar la clase',
      );
    }
  }

  async remove(id: number) {
    await this.validateClasses(id);
    return await this.classRespository.delete({ id });
  }

  private async validateClasses(
    id: number,
  ): Promise<BadRequestException | void> {
    try {
      const classData = await this.classRespository.findOneBy({
        id,
      });

      if (!classData)
        throw new NotFoundException(
          'La clase no se encuentr en la base de datos',
        );
    } catch (error) {
      throw new BadRequestException(
        error.message ?? 'Error al buscar la clase',
      );
    }
  }

  private async mapStudents(
    students: Array<CreateStudentDto>,
  ): Promise<Array<StudentEntity>> {
    const studentsArray = await Promise.all(
      students.map(async (studentDto) => {
        const student = await this.studentRepository.findOneBy({
          email: studentDto.email,
        });
        if (!student) {
          throw new NotFoundException(
            `El estudiante con email ${studentDto.email} no se encuentra en la base de datos`,
          );
        }
        return student;
      }),
    );

    return studentsArray;
  }
}
