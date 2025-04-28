// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt, { compare } from 'bcrypt';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { env } from '@/lib/validateEnv';
import crypto from 'crypto';
import type { OAuthUser, OAuthAccount, GitHubProfile } from '@/app/types/auth';

// Define the NextAuth options directly inside the API route
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email }).select(
          '+password'
        );
        if (!user) throw new Error('Invalid email or password');

        if (credentials === undefined)
          throw new Error('Credential is undefined');
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid email or password');
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: OAuthUser;
      account: OAuthAccount;
      profile?: GitHubProfile;
    }) {
      await connectDB();
      const existing = await User.findOne({ email: user.email });
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashed = await bcrypt.hash(randomPassword, 10);

      if (!existing) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: 'user',
          password: hashed,
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/';
    },
  },
  secret: env.AUTH_SECRET!,
};

// Export the API handler for NextAuth
export const handler = NextAuth(authOptions);

// Export as GET and POST handlers for Next.js 13+ API route
export { handler as GET, handler as POST };
