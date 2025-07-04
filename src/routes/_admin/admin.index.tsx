import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Dashboard | Jobbo'
      }
    ]
  })
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/"!</div>
}
