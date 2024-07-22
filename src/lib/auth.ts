import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL, SERVICE_MODE, isServiceMode } from "@/constants";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { unstable_noStore } from "next/cache";

export let authOptions: NextAuthOptions;

if (!isServiceMode("ADMIN")) {
  authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials) {
            throw new Error("No credentials.");
          }

          const user = await axios
            .post(`${API_URL}/auth/${SERVICE_MODE.toLowerCase()}s/login`, {
              email: credentials.email,
              password: credentials.password,
            })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err.response.data.message);
              if (err.response.data.message.includes("undefined")) {
                throw new Error(
                  "Oops! Something went wrong. Please try again.",
                );
              }
              throw new Error(err.response.data.message);
            });

          let userDetails = await axios
            .get(`${API_URL}/${SERVICE_MODE.toLowerCase()}s/me`, {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            })
            .then((res) => res.data.data)
            .catch((err) => {
              console.log(err);
              throw new Error("Oops! Something went wrong. Please try again.");
            });

          user.token = user.accessToken;

          delete user.accessToken;
          delete user.status;
          delete user.message;

          let userDets = {
            id: userDetails.id,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            profilePicture: userDetails.profilePicture,
            [SERVICE_MODE.toLowerCase()]: userDetails,
          };

          return { ...user, ...userDets };
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 1,
    },
    jwt: {
      maxAge: 60 * 60 * 1,
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (user && account) {
          return { ...token, ...user };
        }
        const tokenParts: {
          exp: number;
          sub: string;
        } = jwtDecode(token.token as string);
        if (Date.now() < tokenParts.exp * 1000) {
          return token;
        }
        return { ...token, error: "token-expired" };
      },
      async session({ session, token }) {
        session.user = token as Session["user"];
        return session;
      },
    },
  };
} else {
  authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials) {
            throw new Error("No credentials.");
          }

          const user = await axios
            .post(`${API_URL}/auth/admin/login`, {
              email: credentials.email,
              password: credentials.password,
            })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err.response.data.message);
              if (err.response.data.message.includes("undefined")) {
                throw new Error(
                  "Oops! Something went wrong. Please try again.",
                );
              }
              throw new Error(err.response.data.message);
            });

          let userDetails = await axios
            .get(`${API_URL}/admin/me`, {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            })
            .then((res) => res.data.data)
            .catch((err) => {
              console.log(err);
              throw new Error("Oops! Something went wrong. Please try again.");
            });

          user.token = user.accessToken;

          delete user.accessToken;
          delete user.status;
          delete user.message;

          let userDets = {
            id: userDetails.id,
            firstName: user.name.split(" ")[0],
            lastName: user.name.split(" ")[1] || "",
            [SERVICE_MODE.toLowerCase()]: {},
          };

          return { ...user, ...userDets };
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 5,
    },
    jwt: {
      maxAge: 60 * 60 * 5,
    },
    callbacks: {
      async jwt({ token, user, account }) {
        if (user && account) {
          return { ...token, ...user };
        }
        const tokenParts: {
          exp: number;
          sub: string;
        } = jwtDecode(token.token as string);
        if (Date.now() < tokenParts.exp * 1000) {
          return token;
        }
        return { ...token, error: "token-expired" };
      },
      async session({ session, token }) {
        session.user = token as Session["user"];
        return session;
      },
    },
  };
}

// Use it in server contexts
export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  unstable_noStore();
  const session = await getServerSession(...args, authOptions);
  return { getUser: () => session?.user && { ...session?.user } };
}
