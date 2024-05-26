import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @ApiProperty({ type: String, description: 'Post review id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: Number, description: 'Review rating' })
  @Column({ type: 'int', nullable: false, default: 5 })
  rating: number;

  @ApiProperty({ type: String, description: 'Id of review creator' })
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ApiProperty({ type: String, description: 'Id of post' })
  @Column({ type: 'uuid', nullable: false })
  postId: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.reviews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: Post;
}
