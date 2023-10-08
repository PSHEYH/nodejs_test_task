import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @ApiProperty({
    description: 'Id of user',
    type: String,
    example: '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
    required: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Name of user', type: String })
  @Column({ type: 'text', nullable: true })
  name: string;

  @ApiProperty({ description: 'Email of user', type: String })
  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @ApiProperty({
    description: 'Password of user',
    type: String,
    required: false,
  })
  @Column({ type: 'text', nullable: false })
  password: string;

  @ApiProperty({
    description: 'Role of user',
    enum: UserRole,
    example: UserRole.User,
    required: false,
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: string;

  @ApiProperty({ description: 'Age of user', type: Number })
  @Column({ type: 'int8', default: 18 })
  age: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
