import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRespository: Repository<StudentEntity>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRespository.findOneBy({
      email: createStudentDto.email,
    });
    if (student) {
      throw new BadRequestException(
        'El email ya se encuentra registrado, no se puede crear otro estudiante con la misma cuenta de email.',
      );
    }
    return await this.studentRespository.save(createStudentDto);
  }

  async findAll() {
    return await this.studentRespository.find();
  }

  async findOne(id: number) {
    this.validateStudent(id);
    return await this.studentRespository.findBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    this.validateStudent(id);
    return await this.studentRespository.update({ id }, updateStudentDto);
  }

  async remove(id: number) {
    this.validateStudent(id);
    return await this.studentRespository.delete({ id });
  }

  private async validateStudent(
    id: number,
  ): Promise<BadRequestException | void> {
    const student = await this.studentRespository.findOneBy({
      id,
    });

    if (!student)
      throw new NotFoundException(
        'El estudiante no se encuentr en la base de datos',
      );
  }
}
