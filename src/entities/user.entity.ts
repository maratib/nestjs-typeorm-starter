import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index('user_user_name_index')
  @Column({ unique: true })
  public userName: string;

  @Index('user_email_index')
  @Column({ unique: true, nullable: true })
  public email?: string;

  @Index('user_phone_number_index')
  @Column({ unique: true, nullable: true })
  public phoneNumber?: string;

  @Exclude()
  @Column()
  public password: string;

  @Exclude()
  @Column({ nullable: true })
  public refreshToken?: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  del: boolean;

  @BeforeInsert()
  async setPassword(password: string) {
    // const salt = await bcrypt.genSalt()
    // this.password = await bcrypt.hash(password || this.password, salt)
    this.password = await bcrypt.hash(password || this.password, 10);
  }

  // @OneToMany(() => Post, (post: Post) => post.author)
  // public posts: Post[];
}
