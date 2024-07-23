'use server'

import prisma from "../prisma/client";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await prisma.verificationToken.findFirst({where: {email}})
    } catch {
        return null
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await prisma.verificationToken.findFirst({where: {token: token}})
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }
}

export const deleteVerificationTokenById = async (id: string) => {
    try {
        return await prisma.verificationToken.deleteMany({
            where: {id: id}
        })
    } catch {
        return null
    }
}

export const deleteVerificationTokenByEmail = async (email: string) => {
    try {
        return await prisma.verificationToken.deleteMany({
            where: {email: email}
        })
    } catch {
        return null
    }
}


export const getPasswordVerificationTokenByEmail = async (email: string) => {
    try {
        return await prisma.resetPasswordToken.findFirst({where: {email}})
    } catch {
        return null
    }
}

export const getPasswordVerificationTokenByToken = async (token: string) => {
    try {
        return await prisma.resetPasswordToken.findFirst({where: {token: token}})
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }
}


export const deletePasswordVerificationTokenById = async (id: string) => {
    try {
        return await prisma.resetPasswordToken.deleteMany({
            where: {id: id}
        })
    } catch {
        return null
    }
}

export const deletePasswordVerificationTokenByEmail = async (email: string) => {
    try {
        return await prisma.resetPasswordToken.deleteMany({
            where: {email: email}
        })
    } catch {
        return null
    }
}