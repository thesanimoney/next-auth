import prisma from "../prisma/client";

export const getUserByEmail  = async (email: string) => {
    try {
        return  await prisma.user.findUnique({where: {email: email}})
    } catch {
        return null
    }
}

export const getUserById  = async (id: string) => {
    try {
        return  await prisma.user.findUnique({where: {id: id}})
    } catch {
        return null
    }
}