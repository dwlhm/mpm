import { Select } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  REGISTER_PARAM,
  RegisterItem,
  addRegister,
} from "../../../../api/register";
import { useRegisterQuery } from "../../../../components/powermeter/hooks";
import { useAuth } from "../../../../auth";
import { useMutation, useQueryClient } from "react-query";

export const Route = createLazyFileRoute(
  "/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/edit",
)({
  component: EditRegister,
});

function EditRegister() {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { powermeterId, registerId } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: rQuery } = useRegisterQuery(auth, powermeterId);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addRegister,
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const data = new FormData(evt.currentTarget);
      const alamat = Number(data.get("alamat"));
      const pengkali = Number(data.get("pengkali"));
      const besaran = data.get("besaran")?.toString();
      const nama = data.get("nama")?.toString();
      const param = data.get("param")?.toString();

      if (!alamat || !pengkali || !besaran || !nama || !param) return;

      let newData: RegisterItem = [alamat, pengkali, besaran, nama, param];
      rQuery[Number(registerId)] = newData;

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
    } catch (error) {
      setIsSubmitting(false);
    }
  };
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
        <form className="mt-5 mb-10 max-w-lg mx-auto" onSubmit={onFormSubmit}>
          <h2 className="mb-10 text-2xl font-semibold text-center">
            Edit Register
          </h2>
          <fieldset className="w-full grid gap-2">
            <div className="grid gap-2 items-center min-w-[300px]">
              <label htmlFor="alamat-input" className="text-sm font-medium">
                Alamat (Desimal)
              </label>
              <input
                id="alamat-input"
                name="alamat"
                placeholder="Masukan Alamat Baru"
                type="number"
                defaultValue={Number(rQuery[Number(registerId)][0])}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-[300px]">
              <label htmlFor="pengkali-input" className="text-sm font-medium">
                Pengkali
              </label>
              <input
                id="pengkali-input"
                name="pengkali"
                placeholder="Masukan Pengkali Baru"
                type="number"
                step={0.00001}
                defaultValue={Number(rQuery[Number(registerId)][1])}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-[300px]">
              <label htmlFor="besaran-input" className="text-sm font-medium">
                Besaran
              </label>
              <input
                id="besaran-input"
                name="besaran"
                placeholder="Masukan Besaran Baru"
                type="text"
                defaultValue={String(rQuery[Number(registerId)][2])}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-[300px]">
              <label htmlFor="nama-input" className="text-sm font-medium">
                Nama
              </label>
              <input
                id="nama-input"
                name="nama"
                placeholder="Masukan Nama Baru"
                type="text"
                defaultValue={String(rQuery[Number(registerId)][3])}
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="grid gap-2 items-center min-w-[300px]">
              <label htmlFor="param-input" className="text-sm font-medium">
                Param
              </label>
              <Select
                name="param"
                aria-label="Param Register"
                className="bg-gray-200 p-2 rounded"
              >
                {REGISTER_PARAM.map((v, i) => (
                  <option
                    value={v}
                    key={`register-param_${i}`}
                    selected={v == rQuery[Number(registerId)][4]}
                  >
                    {v}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex gap-4 mt-5">
              <button
                type="submit"
                className="mt-2 bg-blue-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500"
              >
                {isSubmitting ? "Loading..." : "Simpan"}
              </button>
              <Link
                to="/pengaturan/powermeter/$powermeterId/register"
                params={{ powermeterId }}
                className="mt-2 bg-red-900 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 text-center border border-2 border-red-900 transition hover:border-red-600"
              >
                Batalkan
              </Link>
            </div>
          </fieldset>
          {/* <div>{mutation.isError ? <Errors className="mt-3" process="update data perangkat" message={mutation.error as AxiosError} /> : <></> }</div> */}
        </form>
      </div>
    </div>
  );
}
