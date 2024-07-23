import prisma from "../prisma/client";

const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        return await prisma.twoFactorConfirmation.findUnique({
            where: {userId: userId}
        })
    } catch {
        return null
    }
};

export default getTwoFactorConfirmationByUserId;

export const deleteTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        return await prisma.twoFactorConfirmation.deleteMany({
            where: {userId: userId}
        })
    } catch {
        return null
    }
};

export const createTwoFactorConfirmation = async (userId: string) => {
    try {
        return await prisma.twoFactorConfirmation.create({
            data: {
                userId: userId
            }
        })
    } catch {
        return null
    }
}