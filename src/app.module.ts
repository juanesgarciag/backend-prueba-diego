import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StudentsModule } from './src/modules/students/students.module';
import { TeachersModule } from './src/modules/teachers/teachers.module';
import { ClassesModule } from './src/modules/classes/classes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      autoLoadEntities: true,
      database: 'prueba_diego',
      synchronize: true,
    }),
    StudentsModule,
    TeachersModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
