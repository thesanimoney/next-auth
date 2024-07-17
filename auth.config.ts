import GitHub from "next-auth/providers/github"
import type {NextAuthConfig} from "next-auth"
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import {loginSchema} from "./schemas";
import {getUserByEmail} from "./services/user";
import bcryptjs from "bcryptjs"

interface User {
    password: string
    email: string
}

export default {
    providers: [GitHub, Google, Credentials({
        credentials: {
            email: {},
            password: {},
        },

        async authorize(credentials: User) {
            const validateFields = loginSchema.safeParse(credentials);

            if (!validateFields.success) return null;

            const {email, password} = validateFields.data;
            const user = await getUserByEmail(email);

            if (!user || !user.password) return null;
            const passwordsMatch = await bcryptjs.compare(password, user.password);

            if (passwordsMatch) return user
            return null
        }
    })],
} satisfies NextAuthConfig