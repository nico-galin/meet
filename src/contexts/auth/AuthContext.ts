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
}

const AuthContext = createContext<AuthContextValues>({
  user: undefined,
  isAuthenticated: false,
  publicUser: undefined,
  loading: false,
  auth: null,
  signIn: () => {},
  signOut: () => {}
});

export default AuthContext
