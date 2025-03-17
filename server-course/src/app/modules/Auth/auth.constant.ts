export const USER_ROLE = {
  admin: 'admin',
  instructor: 'instructor',
  student: 'student',
} as const;

export type TURole = keyof typeof USER_ROLE;
