'use server'

import {z} from "zod";
import {registerSchema} from "../schemas";
import prisma from "../prisma/client";
import {getUserByEmail} from "../services/user";
import bcryptjs from "bcryptjs";
import {generateVerificationToken} from "../lib/tokens";
import {sendVerificationEmail} from "../lib/sendVerificationEmail";

export const register = async (values: z.infer<typeof registerSchema>) => {
     const {data, error, success} = registerSchema.safeParse(values)
     if (!success) return {error: 'Invalid fields.'}

     const isRegistred = await getUserByEmail(data?.email)
     if (isRegistred) return {error: 'User is already registered.'}

     const hashedPassword = await bcryptjs.hash(data?.password, 10)
     const user = await prisma.user.create({
          data: {
               email: data?.email,
               password: hashedPassword,
               name: data?.name
          }
     })

     const verificationToken = await generateVerificationToken(user?.email)
     await sendVerificationEmail(user?.email, verificationToken?.token, 'new-verification')

     return {success: 'Confirmation email sent'}
}