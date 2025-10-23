import { timingSafeEqual } from "crypto";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = authSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                const allowedRaw = process.env.ALLOWED_DASHBOARD_EMAILS || "";
                const allowed = allowedRaw
                    .split(",")
                    .map(e => e.trim().toLowerCase())
                    .filter(Boolean);

                if (
                    allowed.length > 0 &&
                    !allowed.includes(email.toLowerCase())
                ) {
                    return null;
                }

                const envPassword = process.env.APP_ADMIN_PASSWORD;
                if (!envPassword || typeof envPassword !== "string") {
                    console.error(
                        "APP_ADMIN_PASSWORD environment variable is not set",
                    );
                    return null;
                }

                const passBuf = Buffer.from(password);
                const envBuf = Buffer.from(envPassword);
                if (passBuf.length !== envBuf.length) return null;
                if (!timingSafeEqual(passBuf, envBuf)) return null;

                return { id: email, email } as any;
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/dashboard/login" },
    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === "production"
                    ? "__Secure-next-auth.session-token"
                    : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.email) token.email = user.email;
            return token;
        },
        async session({ session, token }) {
            if (token?.email)
                session.user = { ...session.user, email: token.email } as any;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
