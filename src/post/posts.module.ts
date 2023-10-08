import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PostGuard } from 'src/guards/post.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PassportModule],
  controllers: [PostController],
  providers: [PostService, PostGuard],
})
export class PostModule {}
