import { CreateUserDto } from 'src/user/dto/create-user.dto';
export const users: CreateUserDto[] = [
  {
    firstName: 'super',
    lastName: 'Admin',
    email: 'admin@super.com',
    password: 'hello123',
    roleId: 3,
  },
  {
    firstName: 'only',
    lastName: 'Admin',
    email: 'only@admin.com',
    password: 'hello123',
    roleId: 2,
  },
  {
    firstName: 'only',
    lastName: 'Manager',
    email: 'only@manager.com',
    password: 'hello123',
    roleId: 1,
  },
];
