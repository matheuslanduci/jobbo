import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'
import { useSession } from '~/client-auth'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent
})

function RouteComponent() {
  const { isPending, data, error } = useSession()

  if (isPending) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-4" />
      </div>
    )
  }

  if (error || data?.user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
