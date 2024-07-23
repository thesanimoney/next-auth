'use server'

import {generatePasswordVerificationToken, generateVerificationToken} from "../lib/tokens";
import {sendVerificationEmail} from "../lib/sendVerificationEmail";
import {getUserByEmail} from "../services/user";
import {resetPasswordSchema} from "../schemas";
import z from 'zod'

export const resetPassword = async (email: z.infer<typeof resetPasswordSchema>) => {
    const validation = resetPasswordSchema.safeParse(email)
    if (!validation.success) return {error: 'Invalid fields!'}

    const data = validation.data

    const existingUser = await getUserByEmail(data.email)
    if (!existingUser) return {error: 'User doesnt exists!'}

    const verificationTokenClient = await generatePasswordVerificationToken(data.email)
    await sendVerificationEmail(data.email, verificationTokenClient?.token, '/new-password')

    return {success: 'Email to reset password sent!'}
};
