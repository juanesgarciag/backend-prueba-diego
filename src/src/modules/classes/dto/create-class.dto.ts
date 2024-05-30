import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateStudentDto } from '../../students/dto/create-student.dto';
import { CreateTeacherDto } from '../../teachers/dto/create-teacher.dto';

export class CreateClassDto {
  @IsNotEmpty({ message: 'El campo nombreClase es requerido' })
  @MinLength(3)
  @IsString()
  nombreClase: string;

  @IsOptional()
  @IsString()
  descripcionClase: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStudentDto)
  estudiantes: CreateStudentDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTeacherDto)
  profesor: CreateTeacherDto;
}
