import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 30)
  firstName: string;
  @IsNotEmpty()
  @Length(3, 30)
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(7, 30)
  password: string;
  roleId: number;
}
