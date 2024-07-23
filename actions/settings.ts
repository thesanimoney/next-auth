'use server'

import {z} from "zod";
import {settingsSchema} from "../schemas";
import currentUser from "../lib/currentUser";
import {getUserById} from "../services/user";
import prisma from "../prisma/client";

const settings = async (values: z.infer<typeof settingsSchema>) => {
    const validation = settingsSchema.safeParse(values)
    if (!validation.success) return {error: 'Invalid fields!'}

    const user = await currentUser()
    if (!user) return {error: 'Unauthorized!'}

    const dbUser = await getUserById(user?.id)
    if (!dbUser) return {error: 'User does not exists!'}

    await prisma.user.update({
        where: {id: dbUser.id},
        data: {...validation.data}
    })

    return {success: 'Settings updated!'}
};

export default settings;