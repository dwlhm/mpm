import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: () => <div className='flex items-center justify-center'>Hello /!</div>
})