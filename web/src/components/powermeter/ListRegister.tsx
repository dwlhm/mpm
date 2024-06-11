import { useRegisterQuery } from "./hooks";
import { AuthContext } from "../../auth";
import React from "react";
import { Link } from "@tanstack/react-router";

export default function ListRegister(props: {
  auth: AuthContext;
  powermeterId: string;
}) {
  const [r, _] = useRegisterQuery(props.auth, props.powermeterId);
  const powermeterId = props.powermeterId
  const rRef = React.useRef<any[]>([])
  rRef.current = r.map((_,i) => rRef.current[i] ?? React.createRef())

  return (
    <>
      {r.map((v, i) => {
        const registerId = String(i)
        return(
        <div className="register-table" key={`register-item_${i}`} ref={rRef.current[i]}>
          <p>{String(v[0])}</p>
          <p>{String(v[1])}</p>
          <p>{v[2]}</p>
          <p>{v[3]}</p>
          <p>{v[4]}</p>
          <div className="flex gap-4">
            <Link 
                to="/pengaturan/powermeter/$powermeterId/register/$registerId/edit"
                params={{ powermeterId, registerId }}
                className="text-sm bg-blue-900 text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-blue-900 transition hover:border-blue-500"
>
                Edit
            </Link>
            <Link
                to="/pengaturan/powermeter/$powermeterId/register/$registerId/hapus"
                params={{ powermeterId, registerId }}
            className="text-sm bg-red-900 text-white py-1 px-2 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500 border border-2 border-red-900 transition hover:border-blue-500">
                Hapus
            </Link>
          </div>
        </div>
      )})}
    </>
  );
}
