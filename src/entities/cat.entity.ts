// import { Post } from '../../posts/entities/post.entity';

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cats' })
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index('cat_name_index')
  @Column({ unique: true })
  public name: string;
}
