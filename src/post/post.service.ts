import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User, UserRole } from 'src/user/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}

  async create(id: string, dto: CreatePostDto) {
    const result = await this.postRepository.insert({
      ...dto,
      userId: id,
    });
    return { id: result.raw[0].id };
  }

  compareFields(dto: UpdatePostDto, fields: string[]) {
    const keys: string[] = Object.getOwnPropertyNames(dto);
    keys.forEach((element) => {
      if (!fields.includes(element)) {
        delete dto[element];
      }
    });
  }

  async update(id: string, dto: UpdatePostDto, fields: string[]) {
    this.compareFields(dto, fields);
    await this.postRepository.update({ id: id }, dto);
  }

  async delete(id: string) {
    await this.postRepository.delete({ id: id });
  }

  async find(id: string) {
    return await this.postRepository.findOne({ where: { id: id } });
  }
  async findAll(user: Pick<User, 'id' | 'role'>) {
    if (user.role === UserRole.Admin) {
      return await this.postRepository.find();
    } else {
      return (
        await this.postRepository.find({ where: { userId: user.id } })
      ).map((e) => {
        delete e.userId;
        return e;
      });
    }
  }
}
