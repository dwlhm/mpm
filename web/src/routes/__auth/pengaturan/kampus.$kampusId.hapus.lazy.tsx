import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/pengaturan/kampus/$kampusId/hapus')({
  component: () => <div>Hello /__auth/pengaturan/kampus/$kampusId/hapus!</div>
})