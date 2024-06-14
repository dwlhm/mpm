import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { DeviceLog, getDeviceLogs } from "../../../api/devices";
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
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Log Perangkat</h3>
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
        <ul className="mt-5">
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
    );
}
