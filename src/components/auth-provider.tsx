import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { currentSessionQueryOptions } from '~/lib/auth'
import type { authClient } from '~/lib/client-auth'

type AuthContextValue =
  | {
      isFetching: false
      isAuthenticated: true
      user: typeof authClient.$Infer.Session.user
      session: typeof authClient.$Infer.Session.session
    }
  | {
      isFetching: true
      user?: never
      session?: never
      isAuthenticated?: never
    }
  | {
      isFetching: false
      isAuthenticated: false
      user: null
      session: null
    }

const authCtx = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isFetching, data } = useQuery(currentSessionQueryOptions())

  let value: AuthContextValue

  if (isFetching) {
    value = { isFetching: true }
  } else if (data?.user) {
    value = {
      isFetching: false,
      isAuthenticated: true,
      user: data.user,
      session: data.session
    }
  } else {
    value = {
      isFetching: false,
      isAuthenticated: false,
      user: null,
      session: null
    }
  }

  return <authCtx.Provider value={value}>{children}</authCtx.Provider>
}

export function useAuth() {
  const context = useContext(authCtx)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}
