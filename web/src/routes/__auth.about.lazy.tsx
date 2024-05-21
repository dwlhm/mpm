import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/about')({
  component: () => <div>Hello /about!</div>
})