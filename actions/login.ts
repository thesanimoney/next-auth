'use server'

import {z} from "zod";
import {loginSchema} from "../schemas";
import {signIn} from "../auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "../routes";
import {getUserByEmail} from "../services/user";
import {generateTwoFactorToken, generateVerificationToken} from "../lib/tokens";
import {sendTwoFactorEmail, sendVerificationEmail} from "../lib/sendVerificationEmail";
import getTwoFactorTokenByToken, {deleteTwoFactorTokenByEmail, getTwoFactorTokenByEmail} from "../services/twoFactorToken";
import prisma from "../prisma/client";
import getTwoFactorConfirmationByUserId, {
    createTwoFactorConfirmation,
    deleteTwoFactorConfirmationByUserId
} from "../services/twoFactorConfirmation";
import bcryptjs from "bcryptjs";

export const login = async (values: z.infer<typeof loginSchema>) => {
    try {
        const {data: {email, password, code}, success} = loginSchema.safeParse(values)
        if (!success) return {error: 'Invalid Fields!'}

        const existingUser = await getUserByEmail(email)
        if (!existingUser?.password || !existingUser) return {error: 'Invalid Credentials!'}

        const isValidPassword = bcryptjs.compareSync(password, existingUser.password)
        if (!isValidPassword) return {error: 'Invalid Credentials!'}

        if (!existingUser?.emailVerified) {
            const token = await generateVerificationToken(email)
            await sendVerificationEmail(email, token?.token, 'new-verification')
            return {success: "Email has been sent, please verify."}
        }

        if (existingUser?.isTwoFactorEnabled && existingUser?.email) {
            if (code) {
                const twoFactorToken = await getTwoFactorTokenByToken(code)
                if (twoFactorToken?.token !== code || !twoFactorToken) return {error: 'Invalid 2FA code!'}

                const hasExpired = new Date(twoFactorToken.expires) < new Date()
                if (hasExpired) return {error: 'Token has expired!'}

                await deleteTwoFactorTokenByEmail(existingUser.email)

                const existingConfirmation = getTwoFactorConfirmationByUserId(existingUser.id)
                if (existingConfirmation) await deleteTwoFactorConfirmationByUserId(existingUser.id)

                await createTwoFactorConfirmation(existingUser.id)
                await deleteTwoFactorTokenByEmail(existingUser.email)

            } else {
                const twoFactorToken = await generateTwoFactorToken(existingUser?.email)
                await sendTwoFactorEmail(existingUser?.email, twoFactorToken?.token)
                return {twoFactor: true}
            }
        }

        const user = await signIn('credentials', {...values, redirectTo: DEFAULT_LOGIN_REDIRECT})
        return {user: user, success: 'Successfully logged in.'}

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "AccessDenied":
                    return {error: 'Something went wrong...'}
                case "CredentialsSignin" || 'CallbackRouteError':
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Something went wrong..."};
            }
        }
        throw error
    }
}