import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'
import { AppHeader } from '~/components/app-header'
import { AppSidebar } from '~/components/app-sidebar'
import { useAuth } from '~/components/auth-provider'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'

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

  if (!isAuthenticated || !user?.role?.includes('admin')) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)'
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
