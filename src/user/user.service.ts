import { Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(dto: CreateUserDto) {
    const result = await this.userRepository.insert(dto);
    return  result.generatedMaps[0];
  }

  async update(id: string, dto: UpdateUserDto) {
    if (dto?.password) {
      const salt = await genSalt(10);
      dto.password = await hash(dto.password, salt);
      await this.userRepository.update({ id: id }, dto);
    } else {
      console.log(dto);
      await this.userRepository.update({ id: id }, dto);
    }
  }

  async delete(id: string) {
    const existedUser = await this.findById(id);
    if (!existedUser) {
      throw new NotFoundException('User with this id not found');
    }
    await this.userRepository.delete({ id: id });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({
      where: { id: id },
      select: {
        name: true,
        email: true,
        age: true,
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
