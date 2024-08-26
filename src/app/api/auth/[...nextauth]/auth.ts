import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "../../lib/db";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/auth/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }){
            const userEmail = session.user?.email;
            if (userEmail && !session.dbUser) {
                const dbUser = await getUser(userEmail);
                console.log(dbUser);
                session.dbUser = dbUser;
                console.log(session.dbUser?.id)
            }
            return session
        }
    }
}