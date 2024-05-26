
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useAuth } from '../../../auth'
import React from 'react'
import DeviceDetails from '../../../components/DeviceDetails';
import SensorData from '../../../components/SensorData';

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId')({
  component: PreviewPerangkat
})

function PreviewPerangkat() {

  const user = useAuth()
  const { perangkatId } = Route.useParams()
  const [ seri, setSeri ] = React.useState<string | undefined>()

  return (
    <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
      <Outlet />
      <DeviceDetails token={user.token} perangkatId={perangkatId} seri={(data: string | undefined) => {setSeri(data)}} />
      <SensorData token={user.token} perangkatId={perangkatId} seri={String(seri)} />
    </div>
  )
}
