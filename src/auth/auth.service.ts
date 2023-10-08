import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { User, UserRole } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(id: string, role: string) {
    const payload = {
      id: id,
      role: role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registration(dto: RegistrationDto) {
    const existedUser: User = await this.userService.findByEmail(dto.email);
    if (existedUser) {
      throw new BadRequestException('User with email already exist');
    }

    const payload = await this.createUser(dto);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(dto: RegistrationDto) {
    const salt = await genSalt(10);

    const user = await this.userService.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    return { id: user.id, role: user.role };
  }

  async validateUser(dto: LoginDto) {
    const user: User = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const correcPassword = await compare(dto.password, user.password);
    if (!correcPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    if (user.role !== 'user' && user.role !== 'admin') {
      throw new BadRequestException('Incorect role');
    }

    return { id: user.id, role: user.role };
  }

  async isExisUser(id: string): Promise<boolean> {
    const user = await this.userService.findById(id);
    if (user) {
      return true;
    }
    return false;
  }
}
