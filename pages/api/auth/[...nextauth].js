import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongo/client'
import { findUserByEmail } from "@/lib/mongo/users"

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'user'
        }
      }
    })
  ],
  database: process.env.MONGO_URI,
  callbacks: {
    async signIn({ account }) {
      return !!account.access_token
    },
    async jwt({ token, user, trigger, session }) {
      const userRec = await findUserByEmail(token.email)
      if (userRec.user) {
        token.userId = userRec.user._id
      }

      if (user) {
        token.role = user.role
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.userId
      return session
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt'
  },
  theme: {
    colorScheme: "light",
    brandColor: "#013833",
    buttonText: '#FFF',
    logo: `/next.svg`,
  }
}

const authHandler = (req, res) => NextAuth(req, res, authOptions);

export default authHandler;
