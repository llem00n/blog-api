import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { PostsService } from 'src/database/services/posts.service';
import { Post } from 'src/models/post.model';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    DatabaseModule.forFeature([PostsService]), 
    TypeOrmModule.forFeature([Post]), 
    AuthModule],
  controllers: [PostsController],
  providers: []
})
export class PostsModule { }
