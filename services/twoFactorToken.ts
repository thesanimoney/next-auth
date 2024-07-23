import prisma from "../prisma/client";

const getTwoFactorTokenByToken = async (token: string) => {
    try {
        return await prisma.twoFactorToken.findUnique({
            where: {token: token}
        })
    } catch {
        return null
    }
};

export default getTwoFactorTokenByToken;

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        return await prisma.twoFactorToken.findFirst({
            where: {email: email}
        })
    } catch {
        return null
    }
};

export const deleteTwoFactorTokenByEmail = async (email: string) => {
    try {
        return await prisma.twoFactorToken.deleteMany({
            where: {email: email}
        })
    } catch {
        return null
    }
};