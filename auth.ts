import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import authConfig from "./auth.config";
import {getUserById} from "./services/user";
import {UserRole} from ".prisma/client";
import getTwoFactorConfirmationByUserId, {deleteTwoFactorConfirmationByUserId} from "./services/twoFactorConfirmation";
import {session} from "@auth/core/lib/actions";
import getAccountByUserId from "./lib/acount";

const prisma = new PrismaClient()

export const {handlers, auth, signIn, signOut,} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    events: {
        async linkAccount({user}) {
            await prisma.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            if (account.provider !== 'credentials') return true

            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) return false

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twoFactorConfirmation) return false
            }

            await deleteTwoFactorConfirmationByUserId(existingUser.id)
            return true
        },

        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
                session.user.role = token.role as UserRole
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
                session.user.isOauth = token.isOauth as boolean
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email
            }

            return session
        },
        async jwt({token, trigger, session}) {
            if (!token.sub) return token

            const user = await getUserById(token.sub)
            if (user) {
                const existingAccount = await getAccountByUserId(token.sub)
                token.isOauth = !!existingAccount
                token.name = user.name
                token.email = user.email
                token.role = user.role
                token.isTwoFactorEnabled = user.isTwoFactorEnabled
            }


            return token
        }
    },
    pages: {
        signIn: '/login',
        newUser: '/register',
        error: '/error'
    }
})