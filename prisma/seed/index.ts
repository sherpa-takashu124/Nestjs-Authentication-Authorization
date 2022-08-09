import {
  Permission,
  PrismaClient,
  Role,
  RolesAndPermission,
} from '@prisma/client';
import { AllPermission } from './persmission';
import { AllRole } from './role';
import { rolesAndPermission } from './rolesAndPermission';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { users } from './user';

async function seed() {
  const client = new PrismaClient();
  for (const role of AllRole) {
    await seedRole(client, role);
  }
  for (const permission of AllPermission) {
    await seedPermission(client, permission);
  }
  for (const rolesPerm of rolesAndPermission) {
    await seedRoleAndPermission(client, rolesPerm);
  }
  for (const user of users) {
    await seedUser(client, user);
  }
}
seed();

async function seedRole(client: PrismaClient, role: Partial<Role>) {
  await client.role.create({
    data: {
      role: role.role,
    },
  });
}
async function seedPermission(
  client: PrismaClient,
  permission: Partial<Permission>,
) {
  await client.permission.create({
    data: {
      permission_slug: permission.permission_slug,
      permission: permission.permission,
    },
  });
}
async function seedRoleAndPermission(
  client: PrismaClient,
  rolesPermission: RolesAndPermission,
) {
  await client.rolesAndPermission.create({
    data: rolesPermission,
  });
}

async function seedUser(client: PrismaClient, user: CreateUserDto) {
  user.password = await argon.hash(user.password);
  await client.user.create({
    data: user,
  });
}
