import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/jobs/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/admin/jobs/new"!</div>
}
