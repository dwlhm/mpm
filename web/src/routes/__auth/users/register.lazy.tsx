import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/users/register')({
  component: () => <div>Hello /__auth/user/register!</div>
})