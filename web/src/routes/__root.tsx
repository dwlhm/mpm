import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
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
    </>
  ),
})
