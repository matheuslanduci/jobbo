import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'
import { useAuth } from '~/components/auth-provider'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent
})

function RouteComponent() {
  const { isFetching, isAuthenticated, user } = useAuth()

  if (isFetching) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-4" />
      </div>
    )
  }

  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
