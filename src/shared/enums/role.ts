export const Role = {
  Admin: 1,
  User: 2,
  Superadmin: 3,
} as const;

export type Role = (typeof Role)[keyof typeof Role];
