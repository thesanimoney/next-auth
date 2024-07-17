'use server'

import {z} from "zod";
import {loginSchema} from "../schemas";
import {signIn} from "../auth";
import {AuthError} from "next-auth";
import {DEFAULT_LOGIN_REDIRECT} from "../routes";

export const login = async (values: z.infer<typeof loginSchema>) => {
    try {
        const user = await signIn('credentials', {...values, redirectTo: DEFAULT_LOGIN_REDIRECT})
        return {user: user, success: 'Successfully logged in.'}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "AccessDenied":
                    return {error: 'Please verify your email.'}
                case "CredentialsSignin" || 'CallbackRouteError':
                    return {error: "Invalid credentials!"};
                default:
                    return {error: "Something went wrong..."};
            }
        }
        throw error
    }
}