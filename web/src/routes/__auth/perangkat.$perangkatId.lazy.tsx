import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId')({
  component: PreviewPerangkat
})

function PreviewPerangkat() {
  return(
    <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
      <div>Hello /__auth/perangkat/$perangkatId!</div>
    </div>
  )
}