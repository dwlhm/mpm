import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/perangkat')({
  component: Perangkat
})

function Perangkat() {
  return (
    <>
      <h2>Perangkat</h2>
    </>
  )
}