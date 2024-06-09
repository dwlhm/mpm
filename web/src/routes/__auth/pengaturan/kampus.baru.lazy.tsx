import { createLazyFileRoute, Link, useRouter } from '@tanstack/react-router'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Kampus, newKampus } from '../../../api/kampus'
import { useAuth } from '../../../auth'
import Errors from '../../../components/Errors'
import { Api } from '@/src/api/internal'

export const Route = createLazyFileRoute('/__auth/pengaturan/kampus/baru')({
  component: KampusBaru
})

function KampusBaru() {
  const auth = useAuth()
  const router = useRouter()
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: newKampus,
    onSettled: () => {
      queryClient.invalidateQueries()
    }
  })

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      evt.preventDefault()
      const data = new FormData(evt.currentTarget)
      const kampus_name: string | undefined = data.get('name')?.toString()

      if (!kampus_name) return

      await mutation.mutate({
        token: auth.token,
        data: {
          name: kampus_name
        }
      },
      {
        onSuccess: (res: AxiosResponse<Api<Kampus>, any>) => {
          const kampusId = res.data.results.id
          setIsSubmitting(false)
          router.invalidate()
          navigate({ to: "/pengaturan/kampus/$kampusId", params: { kampusId } })
        }
      })

    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return(
    <div className='fixed inset-0 flex justify-center items-center z-20'>
      <div 
        className='bg-white rounded shadow-md w-full max-w-2xl p-3'>
        <Link 
          to='/pengaturan/kampus'
          className='inline-block float-right'>
            <div className='bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600'>
              <XMarkIcon className="block h-6 w-6 text-white" />
            </div>
        </Link>
        <form className="mt-5 mb-10 max-w-lg mx-auto" onSubmit={onFormSubmit}>
          <h2 className='mb-10 text-2xl font-semibold text-center'>Tambah Data Kampus</h2>
            <fieldset className="w-full grid gap-2">
              <div className="grid gap-2 items-center min-w-[300px]">
                <label htmlFor="username-input" className="text-sm font-medium">
                  Nama
                </label>
                <input
                  id="name-input"
                  name="name"
                  placeholder="Masukan Nama Kampus yang Ditambahkan"
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
                  {isSubmitting ? "Loading..." : "Simpan"}
                </button>
                <Link
                  to="/pengaturan/kampus"
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