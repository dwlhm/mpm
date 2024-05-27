import { getDeviceDetail } from "../../../api/devices"
import { useAuth } from "../../../auth"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useMutation, useQuery } from 'react-query'

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId/edit')({
  component:EditPerangkat
})

function EditPerangkat() {

  const user = useAuth()
  const { perangkatId } = Route.useParams()

  const perangkatInfo = useQuery({
    queryFn: getDeviceDetail,
    queryKey: [`devices.${perangkatId}`, user.token, perangkatId ]
  })

  const mutation = useMutation({

  })


  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }
  if (perangkatInfo.isSuccess) return(
    <div className='fixed inset-0 flex justify-center items-center'>
      <div 
        className='bg-white rounded shadow-md w-full max-w-2xl p-3'>
        <Link 
          to='/perangkat'
          className='inline-block float-right'>
            <div className='bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600'>
              <XMarkIcon className="block h-6 w-6 text-white" />
            </div>
        </Link>
        <form className="mt-5 mb-10 max-w-lg mx-auto" onSubmit={onFormSubmit}>
          <h2 className='mb-10 text-2xl font-semibold text-center'>Edit Perangkat</h2>
            <fieldset className="w-full grid gap-2">
              <div className="grid gap-2 items-center min-w-[300px]">
                <label htmlFor="username-input" className="text-sm font-medium">
                  Nama Perangkat
                </label>
                <input
                  id="name-input"
                  name="name"
                  placeholder="Masukan Nama Perangkat Baru"
                  type="text"
                  defaultValue={perangkatInfo.data.results.name}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="grid gap-2 items-center min-w-[300px] mt-2">
                <label htmlFor="ip-input" className="text-sm font-medium">
                  IP Perangkat
                </label>
                <input
                  id="ip-input"
                  name="ip"
                  placeholder="Masukan IP Perangkat Baru"
                  type="text"
                  defaultValue={perangkatInfo.data.results.ip_addr}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <button
                  type="submit"
                  className="mt-2 bg-blue-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500"
                >
                  {isSubmitting ? "Loading..." : "Tambahkan"}
                </button>
                <Link
                  to="/perangkat"
                  className="mt-2 bg-red-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 text-center border border-2 border-red-900 transition hover:border-red-600"
                >
                  Batalkan
                </Link>
              </div>
            </fieldset>
          </form>
      </div>
    </div>
  )
}