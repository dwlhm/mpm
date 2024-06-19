import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { DeviceDetail, DeviceLog, getDeviceLogs } from "../../../api/devices";
import { Api } from "../../../api/internal";
import { useAuth } from "../../../auth";
import Errors from "../../../components/Errors";
import Loadings from "../../../components/Loadings";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const Route = createLazyFileRoute("/__auth/perangkat/$perangkatId/logs")(
  {
    component: DeviceLogs,
  },
);

function DeviceLogs() {
  const auth = useAuth();
  const { perangkatId } = Route.useParams();
  const clientQuery = useQueryClient()
  const perangkat = clientQuery.getQueryData<Api<DeviceDetail>>(
    [`device.detail.${perangkatId}`, auth.token, perangkatId]
  )
  const { data, error, isLoading, isError, isSuccess } = useQuery<
    Api<DeviceLog[]>,
    AxiosError
  >({
    queryKey: [`device.logs.${perangkatId}`, auth.token, perangkatId],
    queryFn: getDeviceLogs,
  });

  if (isLoading) return <Loadings />;
  if (isError) return <Errors process="get log perangkat" message={error} />;
  if (isSuccess)
    return (
      <div className="my-10 fixed inset-0 z-30 flex items-center justify-center">
        <div className="max-w-5xl overflow-y-auto bg-white rounded max-h-full">
          <div className="flex justify-between items-center sticky inset-0 bg-white/50 p-5 backdrop-blur">
            <div>
              <h3 className="text-lg font-medium">Log Perangkat</h3>
              <p className="text-sm text-gray-800 font-medium">Perangkat: {perangkat?.results.name}</p>
            </div>
            <Link
              to="/perangkat/$perangkatId"
              params={{ perangkatId }}
              className="inline-block float-right"
            >
              <div className="bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600">
                <XMarkIcon className="block h-6 w-6 text-white" />
              </div>
            </Link>
          </div>
          <ul className="p-5">
            {data.results.map((item, index) => (
              <li key={`logs.${perangkatId}.${index}`} className="mb-5">
                <p className="flex items-center capitalize font-medium gap-2 mb-2">
                  {new Date(item.created_at).toLocaleString()}:
                  <span
                    className={
                      item.type == "error"
                        ? "text-red-500"
                        : item.type == "warning"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }
                  >
                    {item.type}
                  </span>
                </p>
                <p className="bg-gray-200 rounded p-2">{item.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
