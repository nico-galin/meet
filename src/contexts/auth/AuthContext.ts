import { createContext } from 'react'

import User, { PublicUser } from 'models/User'

export interface AuthContextValues {
  user: User | undefined
  isAuthenticated: boolean
  publicUser: PublicUser | undefined
  loading: boolean
  auth: any
  signIn: (email: string) => void
  signOut: () => void
  verifyEmail: (email: string, href: string) => Promise<any>
}

const AuthContext = createContext<AuthContextValues>({
  user: undefined,
  isAuthenticated: false,
  publicUser: undefined,
  loading: false,
  auth: null,
  signIn: () => {},
  signOut: () => {},
  verifyEmail: () => new Promise(() => {}),
});

export default AuthContext
