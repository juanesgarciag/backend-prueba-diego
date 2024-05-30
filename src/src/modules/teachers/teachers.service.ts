import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teacherRespository: Repository<TeacherEntity>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.teacherRespository.findOneBy({
      email: createTeacherDto.email,
    });
    if (teacher) {
      throw new BadRequestException(
        'El email ya se encuentra registrado, no se puede crear otro profesor con la misma cuenta de email.',
      );
    }
    return await this.teacherRespository.save(createTeacherDto);
  }

  async findAll() {
    return await this.teacherRespository.find();
  }

  async findOne(id: number) {
    this.validateTeacher(id);
    return await this.teacherRespository.findBy({ id });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    this.validateTeacher(id);
    return await this.teacherRespository.update({ id }, updateTeacherDto);
  }

  async remove(id: number) {
    this.validateTeacher(id);
    return await this.teacherRespository.delete({ id });
  }

  private async validateTeacher(
    id: number,
  ): Promise<BadRequestException | void> {
    const student = await this.teacherRespository.findOneBy({
      id,
    });

    if (!student)
      throw new BadRequestException(
        'El profesor no se encuentr en la base de datos',
      );
  }
}
