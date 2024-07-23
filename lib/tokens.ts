import {v4 as uuidv4} from 'uuid';
import prisma from "../prisma/client";
import * as crypto from "node:crypto";
import {getPasswordVerificationTokenByEmail, getVerificationTokenByEmail} from "../services/verificationToken";
import {deleteTwoFactorTokenByEmail, getTwoFactorTokenByEmail} from "../services/twoFactorToken";

export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuidv4()
        const expires = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await getVerificationTokenByEmail(email)
        if (existingToken?.id) await prisma.verificationToken.deleteMany({where: {token: existingToken?.id}})

        return await prisma.verificationToken.create({
            data: {
                token,
                expires,
                email
            }
        })
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }
}

export const generatePasswordVerificationToken = async (email: string) => {
    try {
        const token = uuidv4()
        const expires = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await getPasswordVerificationTokenByEmail(email)
        if (existingToken?.id) await prisma.resetPasswordToken.deleteMany({where: {token: existingToken?.id}})

        return await prisma.resetPasswordToken.create({
            data: {
                token,
                expires,
                email
            }
        })
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }
}

export const generateTwoFactorToken = async (email: string) => {
    try {
        const token = crypto.randomInt(100_000, 1_000_000).toString()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getTwoFactorTokenByEmail(email)
    if (existingToken) await deleteTwoFactorTokenByEmail(email)

    return await prisma.twoFactorToken.create({
        data: {
            email,
            expires,
            token
        }
    })
    } catch {
        return null
    }
}