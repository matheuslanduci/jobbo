import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/settings/account')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Account - Settings | Jobbo'
      }
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/settings/account"!</div>
}
