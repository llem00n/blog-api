import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [],
  exports: []
})
export class UsersModule {}
