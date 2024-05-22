import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId')({
  component: () => <div>Hello /__auth/perangkat/$perangkatId!</div>
})