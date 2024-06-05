import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/pengaturan/kampus/$kampusId/edit')({
  component: () => <div>Hello /__auth/pengaturan/kampus/$kampusId/edit!</div>
})