import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'El campo nombre es requerido' })
  @MinLength(3)
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsNotEmpty({ message: 'El campo email es requerido' })
  @IsEmail()
  email: string;
}
