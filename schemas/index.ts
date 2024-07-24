import * as z from 'zod'
import {UserRole} from ".prisma/client";

export const settingsSchema = z.object({
    name: z.string().min(3, {message: 'Name must contain at least 3 characters'}),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, {
        message: 'Password is required.'
    })),
    newPassword: z.optional(z.string().min(6, {
        message: 'New password is required.'
    }))
})
    .refine((data) => {
        return !(data.password && !data.newPassword)
    }, {message: 'New password is required', path: ['newPassword']})

export const loginSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
    password: z.string().min(1, {
        message: 'Password is required.'
    }),
    code: z.optional(z.string())
})

export const registerSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required.'
    }),
    name: z.string().min(3, {
        message: 'Name is required.'
    })
})

export const resetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
})

export const newPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimum 6 characters required.'
    }),
})
