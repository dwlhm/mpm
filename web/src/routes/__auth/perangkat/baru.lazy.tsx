import React from 'react'
import { Link, createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Api, DeviceDetail, Devices, newDevices } from "../../../api/devices"
import { useMutation, useQueryClient } from 'react-query'
import { Token, useAuth } from "../../../auth"

export const Route: any = createLazyFileRoute('/__auth/perangkat/baru')({
  component: PerangkatBaru
})

function PerangkatBaru() {
  const auth = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const mutation = useMutation({
    mutationFn: newDevices,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ 'devices', auth.token ]})
    }
  })

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      evt.preventDefault()
      const data = new FormData(evt.currentTarget)
      const payload: DeviceDetail = {
        name: data.get('name') as string,
        ip_addr: data.get('ip') as string
      }

      if (!payload.name || !payload.ip_addr) return
      await mutation.mutate({
        token: auth.token,
        data: payload
      },
      {
        onSuccess: (res) => {
          console.log(res)
          setIsSubmitting(false)
          router.invalidate()
          navigate({ to: "/perangkat" })
        }
      })

    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return(
    <div className='absolute inset-0 flex justify-center items-center'>
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
          <h2 className='mb-10 text-2xl font-semibold text-center'>Perangkat Baru</h2>
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