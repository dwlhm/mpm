import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../../auth";
import { useRegisterQuery } from "../../../../components/powermeter/hooks";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { addRegister } from "../../../../api/register";
import Errors from "../../../../components/Errors";
import { AxiosError } from "axios";

export const Route = createLazyFileRoute(
  "/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/hapus",
)({
  component: HapusRegister,
});

function HapusRegister() {
  const auth = useAuth();
  const { powermeterId, registerId } = Route.useParams();
  const navigate = Route.useNavigate()
  const {data: rQuery} = useRegisterQuery(auth, powermeterId);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addRegister,
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
  const deleteRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    rQuery.splice(Number(registerId), 1)
    
    mutation.mutate(
      {
        token: auth.token,
        data: {
          register: JSON.stringify(rQuery),
          powermeter: {
            id: powermeterId,
          },
        },
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          queryClient.invalidateQueries();
          navigate({
            to: "/pengaturan/powermeter/$powermeterId/register",
            params: { powermeterId },
          });
        },
      },
    );
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white rounded shadow-md w-full max-w-2xl p-3">
        <Link
          to="/pengaturan/powermeter/$powermeterId/register"
          params={{ powermeterId }}
          className="inline-block float-right"
        >
          <div className="bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600">
            <XMarkIcon className="block h-6 w-6 text-white" />
          </div>
        </Link>
        <div className="mt-5 mb-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-center">
            Hapus Register
          </h2>
          <p className="mt-2 text-center mb-10 font-medium">Anda yakin menghapus register ini?</p>
          <fieldset className="w-full grid gap-2">
              <p className="text-sm">Alamat (Desimal):</p>
              <p className="mb-2">{String(rQuery[Number(registerId)][0])}</p>
              <p className="text-sm">Pengkali:</p>
              <p className="mb-2">{String(rQuery[Number(registerId)][1])}</p>
              <p className="text-sm">Besaran:</p>
              <p className="mb-2">{rQuery[Number(registerId)][2]}</p>
              <p className="text-sm">Nama:</p>
              <p className="mb-2">{rQuery[Number(registerId)][2]}</p>
              <p className="text-sm">Param:</p>
              <p className="mb-2">{rQuery[Number(registerId)][2]}</p>
            <div className="flex gap-4 mt-5">
              <button
                type="submit"
                className="mt-2 bg-red-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 text-center border border-2 border-red-900 transition hover:border-red-600"
                onClick={deleteRegister}
              >
                {isSubmitting ? "Loading..." : "Hapus"}
              </button>
              <Link
                to="/pengaturan/powermeter/$powermeterId/register"
                className="text-center mt-2 bg-blue-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500"
                params={{ powermeterId }}>
                Batalkan
              </Link>
            </div>
          </fieldset>
          <div>{mutation.isError ? <Errors className="mt-3" process="update data perangkat" message={mutation.error as AxiosError} /> : <></> }</div>
        </div>
      </div>
    </div>
  );
}
