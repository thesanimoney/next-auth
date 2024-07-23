'use server'

import {
    getPasswordVerificationTokenByToken,
    getVerificationTokenByToken
} from "../services/verificationToken";
import {getUserByEmail} from "../services/user";
import prisma from "../prisma/client";

const TOKEN_NOT_EXISTS = 'Security token does not exist, please try again!'
const EMAIL_NOT_EXISTS = 'Email does not exist!'

export const newVerification = async (token: string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token);
        if (!existingToken) return {error: TOKEN_NOT_EXISTS};

        const email = existingToken.email

        const isExpired = new Date(existingToken?.expires) < new Date();
        if (isExpired) return {error: 'Token is expired!'};

        const existingUser = await getUserByEmail(existingToken?.email);
        if (!existingUser) return {error: EMAIL_NOT_EXISTS};

        await prisma.user.update({
            where: {id: existingUser?.id},
            data: {
                emailVerified: new Date(),
                email: existingToken?.email
            }
        });

        return {success: 'Email verified!', email: email};
    } catch (err) {
        console.error('Error during verification:', err); // Debugging line
        return {error: 'Internal server error!'};
    }
};

export const newVerificationPassword = async (token: string) => {
    try {
        const existingPasswordToken = await getPasswordVerificationTokenByToken(token);
        if (!existingPasswordToken) return {error: TOKEN_NOT_EXISTS};

        const isExpired = new Date(existingPasswordToken?.expires) < new Date();
        if (isExpired) return {error: 'Token is expired!'};

        const existingUser = await getUserByEmail(existingPasswordToken?.email);
        if (!existingUser) return {error: EMAIL_NOT_EXISTS};

        return {success: 'Token Verified!'}

    } catch (err) {
        console.error('Error during verification:', err); // Debugging line
        return {error: 'Internal server error!'};
    }
};
