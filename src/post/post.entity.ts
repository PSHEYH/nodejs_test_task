import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
export class Post {
  @ApiProperty({ type: String, description: 'Post id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String, description: 'Title of post' })
  @Column({ type: 'text', nullable: false })
  title: string;

  @ApiProperty({ type: String, description: 'Content of post' })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({ type: String, description: 'Post owner id', required: false })
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
