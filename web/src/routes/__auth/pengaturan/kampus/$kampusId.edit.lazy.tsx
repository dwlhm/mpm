import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Api } from '../../../../api/internal'
import { Kampus, updateKampus } from '../../../../api/kampus'
import { useAuth } from '../../../../auth'
import Errors from "../../../../components/Errors"

export const Route = createLazyFileRoute('/__auth/pengaturan/kampus/$kampusId/edit')({
  component: EditKampus
})

function EditKampus() {

  const auth = useAuth()
  const { kampusId } = Route.useParams()
  const navigate = Route.useNavigate()
  const queryClient = useQueryClient()
  const kampusRepo = queryClient.getQueriesData(["kampus"])
  const kampusApiData = kampusRepo[0][1] as Api<Kampus[]>
  const kampus = kampusApiData.results.find(item => item.id == kampusId)
  const [ isSubmitting, setIsSubmitting ] = React.useState<boolean>(false)
  const mutation = useMutation({
    mutationFn: updateKampus,
    onSettled: () => {
      queryClient.invalidateQueries()
    }
  })

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    try {
      evt.preventDefault()
    const data = new FormData(evt.currentTarget)
    const payload: Kampus = {
      id: kampusId,
      name: data.get("name") as string
    }

    mutation.mutate({
      token: auth.token,
      data: payload
    }, {
      onSuccess: () => {
        setIsSubmitting(false)
        navigate({ to: "/pengaturan/kampus/$kampusId", params: { kampusId } })
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

  return(
    <div className='fixed inset-0 flex justify-center items-center'>
      <div 
        className='bg-white rounded shadow-md w-full max-w-2xl p-3'>
        <Link 
          to='/pengaturan/kampus/$kampusId'
          params={{ kampusId }}
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
                  Nama Kampus
                </label>
                <input
                  id="name-input"
                  name="name"
                  placeholder="Masukan Nama Kampus Baru"
                  type="text"
                  defaultValue={kampus?.name}
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
                  to='/pengaturan/kampus/$kampusId'
                  params={{ kampusId }}
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