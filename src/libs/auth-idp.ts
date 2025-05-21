// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'

import type { NextAuthOptions, TokenSet } from 'next-auth'
import type { JWT } from 'next-auth/jwt'


const requestRefreshOfAccessToken = (token: JWT) => {
  // console.log('init requestRefreshOfAccessToken.expiresAt', token.expiresAt)
  // console.log('init requestRefreshOfAccessToken.refreshToken', token.refreshToken)
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID as string,
      client_secret: process.env.KEYCLOAK_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken! as string
    }).toString()
  })

  // return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: new URLSearchParams({
  //     client_id: process.env.KEYCLOAK_ID as string,
  //     client_secret: process.env.KEYCLOAK_SECRET as string,
  //     grant_type: 'refresh_token',
  //     refresh_token: token.refreshToken! as string
  //   }),
  //   method: 'POST',
  //   cache: 'no-store'
  // })
}

const requestAccessToken = (email: String, password: String) => {
  console.log('init requestAccessToken.email',email)
  console.log('init requestAccessToken.password',password)
  
return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID as string,
      client_secret: process.env.KEYCLOAK_SECRET as string,
      grant_type: 'password',
      username: email,
      password: password
    }).toString()
  })
}


export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        try {
          const res = await requestAccessToken(email, password);
          const data = await res.json()

          if (res.status === 401) {
            data.message = ['Usuario o password inválida']
            throw new Error(JSON.stringify(data))
          }

          if (res.status === 200) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */
            return {
              id: email, // Opcional: usa el email como ID
              access_token: data.access_token, // ✅ Asegúrate de que esto se devuelve
              refresh_token: data.refresh_token,
              expires_in: data.expires_in
            }
          }

          return null
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // })

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    // maxAge: 30 * 24 * 60 * 60 // ** 30 days
    maxAge: 60 * 30 *6// ** 30 min
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user}) {      
      if (user) {
        token.accessToken = user.access_token // ✅ Guardamos correctamente el token
        token.refreshToken = user.refresh_token
        token.expiresIn = user.expires_in
        
return token
      }

      // we take a buffer of one minute(60 * 1000 ms)
      if (Date.now() < (token.expiresIn! as number) * 1000 - 60 * 1000) {
        return token
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token)

          // console.log(response)
          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            expires_in: tokens.expires_in,
            refresh_token: tokens.refresh_token ?? token.refreshToken
          }

          
return updatedToken
        } catch (error) {
          console.error('Error refreshing access token', error)
          
return { ...token, error: 'RefreshAccessTokenError' }
        }
      }

    },
    async session({ session, token, user  }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          name: token.name || "Usuario",
          email: token.sub || "email@example.com",
          image: token.picture || "/default-avatar.png"
        }
      }
    }
  }
}