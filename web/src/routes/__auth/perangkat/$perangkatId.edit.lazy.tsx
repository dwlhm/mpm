import Errors from "../../../components/Errors"
import { DeviceDetail, getDeviceDetail, updateDevices } from "../../../api/devices"
import { useAuth } from "../../../auth"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from "axios"

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId/edit')({
  component:EditPerangkat
})

function EditPerangkat() {

  const user = useAuth()
  const { perangkatId } = Route.useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate({ from: "/perangkat/$perangkatId" })

  const perangkatInfo = useQuery({
    queryFn: getDeviceDetail,
    queryKey: [`devices.${perangkatId}`, user.token, perangkatId ]
  })

  const mutation = useMutation({
    mutationFn: updateDevices,
    onError(error, variables, context) {
      console.log("ERROR", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`devices.${perangkatId}`, user.token, perangkatId ] })
      queryClient.invalidateQueries({ queryKey: [ 'devices', user.token ]})
    }
  })


  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      evt.preventDefault()
    const data = new FormData(evt.currentTarget)
    const payload: { device: DeviceDetail, id: string } = {
      device: {
        name: data.get("name") as string,
        ip_addr: data.get("ip") as string
      },
      id: perangkatId
    }

    mutation.mutate({
      token: user.token,
      data: payload
    }, {
      onSuccess: (res) => {
        setIsSubmitting(false)
        navigate({ to: "/perangkat/$perangkatId" })
      },
      onError: () => {
        setIsSubmitting(false)
      }
    }) 
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
     
  }

  if (perangkatInfo.isSuccess) return(
    <div className='fixed inset-0 flex justify-center items-center'>
      <div 
        className='bg-white rounded shadow-md w-full max-w-2xl p-3'>
        <Link 
          to='/perangkat/$perangkatId'
          params={{ perangkatId: perangkatId }}
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
                  {isSubmitting ? "Loading..." : "Simpan"}
                </button>
                <Link
                  to="/perangkat/$perangkatId"
                  params={{ perangkatId: perangkatId }}
                  className="mt-2 bg-red-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 text-center border border-2 border-red-900 transition hover:border-red-600"
                >
                  Batalkan
                </Link>
              </div>
            </fieldset>
            <div>{mutation.isError ? <Errors className="mt-3" process="update data perangkat" message={mutation.error as AxiosError} /> : <></> }</div>
          </form>
      </div>
    </div>
  )
}