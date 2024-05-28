import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@/core/dto/create-user.dto';
import { UpdateUserDto } from '@/core/dto/update-user.dto';
import { PaginationParams } from '@/core/dto/pagination-params';
import { MyInterceptor } from '@/core/interceptors/my.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@UseInterceptors(MyInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getAllUsers(
    // @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    return await this.usersService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
