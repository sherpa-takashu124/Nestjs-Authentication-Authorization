import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Permission from 'src/enum/permission.enum';
import PermissionGuard from 'src/auth/guard/permission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //admin and super admin create user
  @Post()
  @UseGuards(PermissionGuard(Permission.write))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(PermissionGuard(Permission.Read))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionGuard(Permission.Read))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Permission.write))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Permission.Delete))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
