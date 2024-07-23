'use server'

import prisma from "../prisma/client";
import bcryptjs from "bcryptjs";
import {
    deletePasswordVerificationTokenById, getPasswordVerificationTokenByToken,
} from "../services/verificationToken";
import {getUserByEmail} from "../services/user";

const UpdatePassword = async (password: string, token: string) => {
    const existingToken = await getPasswordVerificationTokenByToken(token)
    if (!existingToken) return {error: 'Token does not exists!'}

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) return {error: 'User not found!'}

    await prisma.user.update({
        where: {email: existingUser.email},
        data: {password: hashedPassword}
    })

    await deletePasswordVerificationTokenById(existingToken?.id)
    return {success: 'Password updated successfully!'}
};

export default UpdatePassword;