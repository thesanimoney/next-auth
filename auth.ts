import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config";
import {getUserById} from "./services/user";
import {UserRole} from ".prisma/client";

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({user}) {
       await prisma.user.update({
        where: { id: user.id },
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({token}) {
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      token.role = user.role

      return token
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
})