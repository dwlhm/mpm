import { createRootRoute, createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthContext } from '../auth'
import { QueryClient } from 'react-query'

interface CustomRouteContext {
  auth: AuthContext,
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<CustomRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
