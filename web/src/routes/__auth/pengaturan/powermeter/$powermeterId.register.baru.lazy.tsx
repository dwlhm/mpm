import {
  REGISTER_PARAM,
  RegisterItem,
  addRegister,
} from "../../../../api/register";
import { useAuth } from "../../../../auth";
import { Input, Select } from "@headlessui/react";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRegisterQuery } from "../../../../components/powermeter/hooks";

export const Route = createLazyFileRoute(
  "/__auth/pengaturan/powermeter/$powermeterId/register/baru",
)({
  component: RegisterBaru,
});

function RegisterBaru() {
  const auth = useAuth();
  const { powermeterId } = Route.useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate();
  const mutation = useMutation({
    mutationFn: addRegister,
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const { data: pmRepo } = useRegisterQuery(auth, powermeterId)

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const alamat = Number(data.get("alamat"));
      const pengkali = Number(data.get("pengkali"));
      const besaran = data.get("besaran")?.toString();
      const nama = data.get("nama")?.toString();
      const param = data.get("param")?.toString();

      if (!alamat || !pengkali || !besaran || !nama || !param) return;

      let newData: RegisterItem = [alamat, pengkali, besaran, nama, param];

      pmRepo.push(newData);

      mutation.mutate(
        {
          token: auth.token,
          data: {
            register: JSON.stringify(pmRepo),
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
    <form className="register-table add-edit-register" onSubmit={onFormSubmit}>
      <Input type="number" name="alamat" placeholder="ex: 2304" />
      <Input type="number" name="pengkali" placeholder="ex: 0.1" step={0.00001} />
      <Input type="text" name="besaran" placeholder="ex: V" />
      <Input type="text" name="nama" placeholder="ex: Tegangan A" />
      <Select name="param" aria-label="Param Register">
        {REGISTER_PARAM.map((v, i) => (
          <option value={v} key={`register-param_${i}`}>
            {v}
          </option>
        ))}
      </Select>
      <div className="flex gap-4 p-2">
        <button className="text-sm text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500">
          {isSubmitting ? "Loading..." : "Simpan"}
        </button>
        <Link
          to="/pengaturan/powermeter/$powermeterId/register"
          params={{ powermeterId }}
          className="text-sm bg-red-900 text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 text-center border border-2 border-red-900 transition hover:border-red-600"
        >
          Batalkan
        </Link>
      </div>
    </form>
  );
}
