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
import { Line } from "react-chartjs-2"
import React from 'react';
import { useQuery } from 'react-query';
import { Api, Datasheets, SensorData, getSensorData } from '../api/devices';
import Errors from './Errors';
import { AxiosError } from 'axios';

let repository: { [key: number ]: number[] } = {}
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

export default function ChartsView(props: { datasheet: Datasheets[], perangkatId: string | undefined, token: string | null }) {
 
    const { isSuccess, isError, data, error } = useQuery<Api<SensorData>, AxiosError>({
      queryFn: getSensorData,
      queryKey: [ `devices.${props.perangkatId}.data`, props.token, props.perangkatId ],
      retry: true,
      retryDelay: 5000
    })

    if (isError) return <Errors process='mendapatkan data pembacaan terbaru' message={error} />
  
    if (data?.results.timestamp !== last_timestamp) {
      last_timestamp = String(data?.results.timestamp)
      timestamp_repo.push(new Date(last_timestamp).toLocaleTimeString())
      if (timestamp_repo.length > 100) {
        timestamp_repo.shift()
      }
      JSON.parse(data!.results.data).forEach((v: number[]) => {
        if (!repository[v[1]]) repository[v[1]] = []
        repository[v[1]].push(v[0])
        if (timestamp_repo.length > 100) {
          repository[v[1]].shift()
        }
      })
      
    }
  
    if (isSuccess) return (
      <>
        <p className='text-sm'>Diperbaharui pada: {new Date(data.results.timestamp).toLocaleString()}</p>
        <div className='grid grid-cols-3 gap-2 mt-6'>
          {Object.keys(repository).map(v => <div key={`data.${v}`} className='rounded bg-gray-900 py-4 px-5 text-gray-200'>
            <h4 className='text-base font-medium'>{props.datasheet[Number(v)][2]}</h4>
            <div className="my-1 h-px bg-white/50 mb-2" />
            <div>
              <Line options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} data={{labels: timestamp_repo, datasets: [{
                label: 'data',
                data: repository[Number(v)],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }]}} />
            </div>
            <ul className='live-data max-h-48 overflow-auto'>
              {repository[Number(v)].map((_, i) => (
                <li key={`${v}-${i}`} className='flex justify-between'>
                  <p>{repository[Number(v)][repository[Number(v)].length - (i + 1)]} {props.datasheet[Number(v)][3]}</p>
                  <p>{timestamp_repo[timestamp_repo.length - (i + 1)]}</p>
                </li>
              ))}
            </ul>
          </div>)}
        </div>
      </>
    )
  }