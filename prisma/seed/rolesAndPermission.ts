import { RolesAndPermission } from '@prisma/client';
//SUPER ADMIN HAVE ALL THE PERMISSION (READ, WRITE, DELETE)
//ADMIN HAVE READ AND WRITE PERMISSION
//MANAGE HAVE ONLY READ PERMISSION
export const rolesAndPermission: RolesAndPermission[] = [
  {
    roleId: 3,
    permissionId: 1,
  },
  {
    roleId: 3,
    permissionId: 2,
  },
  {
    roleId: 3,
    permissionId: 3,
  },
  {
    roleId: 2,
    permissionId: 1,
  },
  {
    roleId: 2,
    permissionId: 2,
  },
  {
    roleId: 1,
    permissionId: 1,
  },
];
