import { createLazyFileRoute } from '@tanstack/react-router'
import { useQueryClient, useQuery } from 'react-query'
import { getDevices } from "../api/devices"
import { useAuth } from '../auth'

export const Route = createLazyFileRoute('/__auth/dashboard')({
  component: Dashboard
})


function Dashboard() {

  const user = useAuth()

  const queryClient = useQueryClient()
  const { isFetching, ...queryInfo } = useQuery({
    queryKey: ['devices', user.token],
    queryFn: getDevices
  })


  return (
    <>
      {JSON.stringify(queryInfo)}
    </>
  )
}