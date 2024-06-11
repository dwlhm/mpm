import { useRegisterQuery } from "./hooks";
import { AuthContext } from "../../auth";
import { Link } from "@tanstack/react-router";
import Loadings from "../Loadings";

export default function ListRegister(props: {
  auth: AuthContext;
  powermeterId: string;
}) {
  const { data: register, isLoading: rLoading } = useRegisterQuery(
    props.auth,
    props.powermeterId,
  );
  const powermeterId = props.powermeterId;

  if (rLoading) return <Loadings />;
  return (
    <>
      {register.map((data, i) => (
        <div className="register-table" key={`register-item_${i}`}>
          <p>{String(data[0])}</p>
          <p>{String(data[1])}</p>
          <p>{data[2]}</p>
          <p>{data[3]}</p>
          <p>{data[4]}</p>
          <div className="flex gap-4">
            <Link
              to="/pengaturan/powermeter/$powermeterId/register/$registerId/edit"
              params={{ powermeterId, registerId: String(i) }}
              className="text-sm bg-blue-900 text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500"
            >
              Edit
            </Link>
            <Link
              to="/pengaturan/powermeter/$powermeterId/register/$registerId/hapus"
              params={{ powermeterId, registerId: String(i) }}
              className="text-sm bg-red-900 text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-red-900 transition hover:border-blue-500"
            >
              Hapus
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
