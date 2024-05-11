import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmTestingModule } from '../config';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Find all users', async () => {
    const users = await service.findAll();
    console.log(users);
    expect(service).toBeDefined();
  });

  it('Create a User', async () => {
    const userDto: CreateUserDto = {
      userName: 'waleed',
      email: 'ma1ratib3@gmail.com',
      phoneNumber: '03229249400',
      password: 'passw0rd',
      refreshToken: '',
    };

    const user = await service.create(userDto);
    console.log(user);
  });
});
