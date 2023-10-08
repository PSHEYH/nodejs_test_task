import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User, UserRole } from './user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: CreateUserDto })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', required: true })
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Get my user data' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [User] })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  async getUser(@GetUser() user) {
    return await this.userService.findById(user.id);
  }

  @ApiOperation({ summary: 'Update my user data' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200 })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateMe(@GetUser() user, @Body() dto: UpdateUserDto) {
    await this.userService.update(user.id, dto);
  }

  @ApiOperation({ summary: 'Delete me' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteMe(@GetUser() user) {
    await this.userService.delete(user.id);
  }
}
