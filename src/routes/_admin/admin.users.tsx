import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { standardSchemaV1 } from 'effect/Schema'
import {
  BanIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  PenIcon,
  TrashIcon
} from 'lucide-react'
import { getUserInitials } from '~/components/nav-user'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '~/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '~/components/ui/tooltip'
import type { authClient } from '~/lib/client-auth'
import { PaginationParams } from '~/lib/pagination'
import { usersQueryOptions } from '~/lib/users'

export const Route = createFileRoute('/_admin/admin/users')({
  component: RouteComponent,
  validateSearch: standardSchemaV1(PaginationParams),
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      usersQueryOptions(deps.page, deps.pageSize)
    )
  }
})

const columns: ColumnDef<typeof authClient.$Infer.Session.user>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg grayscale">
          <AvatarImage src={row.original.image || ''} alt={row.original.name} />
          <AvatarFallback className="rounded-lg">
            {getUserInitials(row.original.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0.5">
          <span className="truncate font-medium">{row.original.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {row.original.email}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <Badge variant={row.original.banned ? 'destructive' : 'default'}>
            {row.original.banned ? 'Banned' : 'Active'}
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          {row.original.banned
            ? `${row.original.banReason || 'This user is banned.'} ${
                row.original.banExpires
                  ? `Ban expires on ${new Date(
                      row.original.banExpires
                    ).toLocaleDateString()}`
                  : ''
              }`
            : 'This user is active and can log in.'}
        </TooltipContent>
      </Tooltip>
    )
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.role?.split(',').map((role) => (
          <Badge key={role} variant="secondary">
            {role.trim()}
          </Badge>
        ))}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    )
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[160px]">
          <DropdownMenuItem>
            <PenIcon />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem>
            <TrashIcon />
            Delete
          </DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">
            <BanIcon className="text-inherit" />
            Ban User
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <CopyIcon />
            Copy User ID
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]

function RouteComponent() {
  const { page, pageSize } = Route.useLoaderDeps()
  const { data, isFetching } = useQuery(usersQueryOptions(page, pageSize))

  return (
    <div className="flex flex-col gap-4">
      {}
      <DataTable columns={columns} data={data?.users ?? []} />
    </div>
  )
}
