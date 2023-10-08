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
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { User, UserRole } from 'src/user/user.entity';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { PostGuard } from 'src/guards/post.guard';
import { GetPost } from 'src/decorators/get-post.decorator';
import { OmitPost } from './omit-post';
import { GetUpdateFields } from 'src/decorators/get-update-fields.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserResponse } from './create-user.response';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, type: CreateUserResponse })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@GetUser() user, @Body() dto: CreatePostDto) {
    return await this.postService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Update post by id' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard, PostGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreatePostDto,
    @GetUpdateFields() fields: string[]
  ) {
    return await this.postService.update(id, dto, fields);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [PostModel] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts(@GetUser() user) {
    return await this.postService.findAll(user);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({ name: 'id', description: 'Id of post' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PostModel })
  @UseGuards(JwtAuthGuard, PostGuard)
  @Get(':id')
  async getPostById(@GetPost() post: OmitPost) {
    return post;
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({ name: 'id', description: 'Id of post' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, PostGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.delete(id);
  }
}
