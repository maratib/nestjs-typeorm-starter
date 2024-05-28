import { AppModule } from './../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../core/dto/create-user.dto';
import { after } from 'node:test';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    console.log('UserService testing starts.');
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    // process.exit(0);
    console.log('UserService testing completed.');
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
      userName: 'waleed12',
      email: 'ma1ratib32@gmail.com',
      phoneNumber: '03229249402',
      password: 'passw0rd',
      refreshToken: '',
    };

    const user = await service.create(userDto);
    console.log(user);
  });
});
