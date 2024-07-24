'use server'

import prisma from "../prisma/client";

const getAccountByUserId = async (userId: string) => {
   try {
        return await prisma.account.findFirst({
        where: {
            userId: userId
        }
    })
   } catch {
       return null
   }
};

export default getAccountByUserId;