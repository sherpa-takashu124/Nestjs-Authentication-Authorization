import { Role } from '@prisma/client';

export const AllRole: Partial<Role>[] = [
  { role: 'Manager' },
  { role: 'Admin' },
  { role: 'Super Admin' },
];
