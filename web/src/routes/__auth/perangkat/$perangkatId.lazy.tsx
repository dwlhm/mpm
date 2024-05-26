import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { useQuery } from 'react-query'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { getDatasheetDevices, getSensorData } from '../../../api/devices'
import { useAuth } from '../../../auth'
import React from 'react'
import DeviceDetails from '@/src/components/DeviceDetails';

let repository = {}
let last_timestamp: string;
let timestamp_repo: string[] = [];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId')({
  component: PreviewPerangkat
})

function PreviewPerangkat() {

  const user = useAuth()
  const { perangkatId } = Route.useParams()
  const [ seri, setSeri ] = React.useState("")

  return (
    <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
      <Outlet />
      <DeviceDetails token={user.token} perangkatId={perangkatId} seri={(data: string) => {setSeri(data)}} />
      <SensorData token={user.token} perangkatId={perangkatId} seri={seri} />
    </div>
  )
}

function SensorData(props: { token: string | null, perangkatId: string, seri: string }) {

  const { isLoading, isError, isSuccess, data, error} = useQuery({
    queryFn: getSensorData,
    queryKey: [ `devices.${props.perangkatId}.data`, props.token, props.perangkatId ]
  })

  if (isLoading) return <p className='mt-5'>Mendapatkan data hasil pengukuran perangkat...</p>
  if (isError) return <p className='text-red-800 mt-5'><span className='font-semibold'>Error: </span>{error.response.data.detail}</p>
  if (isSuccess) return <ChartsView data={data.results} seri={props.seri} token={props.token}/>
}

function ChartsView(props: { data: any, seri: string, token: string | null }) {

  const [repo, setRepo] = React.useState({})

  const { isSuccess, isError, data } = useQuery({
    queryFn: getDatasheetDevices,
    queryKey: [ `datasheets.${props.seri}`, props.token, props.seri],
    retry: true,
    retryDelay: 5000
  })

  if (props.data.timestamp !== last_timestamp) {
    JSON.parse(props.data.data).forEach((v,i) => {
      if (!repository[v[i]]) repository[v[i]] = []
      repository[v[i]].push(v[0])
    })
    setRepo(repository)
    last_timestamp = props.data.timestamp
    timestamp_repo.push(last_timestamp)
  }

  if (isSuccess) return (
    <>
      <p className='text-sm'>Diperbaharui pada: {new Date(props.data.timestamp).toLocaleString()}</p>
      <div className='grid grid-cols-3 gap-2 mt-6'>
        {Object.keys(repository).map(v => <div className='rounded bg-gray-900 py-4 px-5 text-gray-200'>
          <h4 className='text-base font-medium'>{data.results[v][2]}</h4>
          <div className="my-1 h-px bg-white/50 mb-2" />
          {/* <div>
            <Line options={{
              responsive: true
            }} data={{timestamp_repo, datasets: [{
              label: 'data',
              data: repo[v],
              borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }]}} />
          </div> */}
          <ul className='live-data'>
            {repository[v].map((val, i) => (
              <li key={`${v}-${i}`} className='flex justify-between'>
                <p>{repository[v][repository[v].length - (i + 1)]} {data.results[v][3]}</p>
                <p>{new Date(timestamp_repo[timestamp_repo.length - (i + 1)]).toLocaleTimeString()}</p>
              </li>
            ))}
          </ul>
        </div>)}
      </div>
    </>
  )
}
