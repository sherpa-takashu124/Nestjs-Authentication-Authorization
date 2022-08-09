import { Permission } from '@prisma/client';

export const AllPermission: Partial<Permission>[] = [
  { permission_slug: 'READ', permission: 'Read' }, //only read
  { permission_slug: 'WRITE', permission: 'Write' }, //read and write
  { permission_slug: 'DELETE', permission: 'Delete' }, // read, write , delete
  { permission_slug: 'NONE', permission: 'None' }, // Completely no access
];
