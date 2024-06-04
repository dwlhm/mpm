import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router';

const queryClient = new QueryClient();

import { routeTree } from './routeTree.gen';
import { AuthProvider, useAuth } from './auth';

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
    queryClient
  },
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
