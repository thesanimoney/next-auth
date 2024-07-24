'use server'

import {z} from "zod";
import {settingsSchema} from "../schemas";
import currentUser from "../lib/currentUser";
import {getUserByEmail, getUserById} from "../services/user";
import prisma from "../prisma/client";
import bcryptjs from "bcryptjs";
import {sendVerificationEmail} from "../lib/sendVerificationEmail";
import {generateVerificationToken} from "../lib/tokens";
import {unstable_update} from "../auth";

const settings = async (values: z.infer<typeof settingsSchema>) => {
    const validation = settingsSchema.safeParse(values)
    if (!validation.success) return {error: 'Invalid fields!'}

    let {newPassword, password, name, email, role, isTwoFactorEnabled} = validation.data

    const user = await currentUser()
    if (!user) return {error: 'Unauthorized!'}

    const dbUser = await getUserById(user?.id)
    if (!dbUser) return {error: 'User does not exists!'}

    let hashedPassword = undefined

    if (user.isOauth) {
        newPassword = undefined;
        password = undefined;
        email = undefined;
        isTwoFactorEnabled = undefined;
    }

    if (password && newPassword) {
        const isValidPasswod = bcryptjs.compareSync(password, dbUser?.password)

        if (!isValidPasswod) return {error: 'Password is incorrect'}
        else if (newPassword === password) return {error: 'Passwords are matching!'}
        hashedPassword = bcryptjs.hashSync(newPassword)
    }

    if (email && user.email !== email) {
        if (dbUser && dbUser?.id !== user?.id) return {error: 'Email already in use!'}

        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(user?.email, verificationToken?.token, 'new-verification')

        return {success: 'Verification email sent!'}
    }

    const updatedUser = await prisma.user.update({
        where: {id: dbUser.id},
        data: {
            name,
            password: hashedPassword,
            email,
            role,
            isTwoFactorEnabled
        }
    })

    await unstable_update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled
        }
    })

    return {success: 'Settings updated!'}
};

export default settings;