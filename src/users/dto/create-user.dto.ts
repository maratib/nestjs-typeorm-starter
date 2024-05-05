import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  userName: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber('ID')
  phoneNumber?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  refreshToken?: string;
}
