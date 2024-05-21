import { createLazyFileRoute } from '@tanstack/react-router'
import { useQueryClient, useQuery } from 'react-query'
import { getDevices } from "../api/devices"

export const Route = createLazyFileRoute('/__auth/dashboard')({
  component: () => <div>Hello /__auth/dashboard!</div>
})


function Dashboard() {

  const queryClient = useQueryClient()
  const { isFetching, ...queryInfo } = useQuery({
    queryKey: ['devices'],
    queryFn: getDevices
  })


  return (
    <>
      {JSON.stringify(queryInfo)}
    </>
  )
}