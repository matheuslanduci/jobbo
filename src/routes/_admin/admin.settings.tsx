import { createFileRoute, Link, useLocation } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

export const Route = createFileRoute('/_admin/admin/settings')({
  component: RouteComponent
})

function RouteComponent() {
  const location = useLocation()
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={location.pathname}>
        <TabsList>
          <TabsTrigger value="/admin/settings" asChild>
            <Link to="/admin/settings">General</Link>
          </TabsTrigger>

          <TabsTrigger value="/admin/settings/account" asChild>
            <Link to="/admin/settings/account">Account</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
