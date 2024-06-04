import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/pengaturan/kampus/$kampusId')({
  component: () => <div>Hello /__auth/pengaturan/kampus/$kampusId!</div>
})