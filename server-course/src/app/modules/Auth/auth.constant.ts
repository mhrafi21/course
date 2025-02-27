export const  USER_ROLE = {
    admin: 'admin',
    user: 'user',
} as const;

export type TURole = keyof typeof USER_ROLE;