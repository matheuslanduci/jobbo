import { Link } from '@tanstack/react-router'
import {
  ChartNoAxesCombinedIcon,
  KeyIcon,
  LayoutDashboardIcon,
  NotebookPenIcon,
  UsersRoundIcon
} from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'

const items = [
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    to: '/admin'
  },
  {
    title: 'Jobs',
    icon: NotebookPenIcon,
    to: '/admin/jobs'
  },
  {
    title: 'Analytics',
    icon: ChartNoAxesCombinedIcon,
    to: '/admin/analytics'
  },
  {
    title: 'Users',
    icon: UsersRoundIcon,
    to: '/admin/users'
  },
  {
    title: 'API Keys',
    icon: KeyIcon,
    to: '/admin/api-keys'
  }
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  to={item.to}
                  activeOptions={{
                    exact: true
                  }}
                  activeProps={{
                    className: 'bg-accent'
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
