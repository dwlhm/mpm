import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../auth";
import SensorData from "../../../components/SensorData";
import { useQuery } from "react-query";
import { DeviceDetail, getDeviceDetail } from "../../../api/devices";
import Loadings from "../../../components/Loadings";
import Errors from "../../../components/Errors";
import { Api } from "../../../api/internal";
import { AxiosError } from "axios";
import PerangkatOptions from "../../../components/PerangkatOptions";
import { RegisterItem } from "src/api/register";

export const Route = createLazyFileRoute("/__auth/perangkat/$perangkatId")({
  component: PreviewPerangkat,
});

function PreviewPerangkat() {
  const user = useAuth();
  const { perangkatId } = Route.useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: dDetail,
    error: dError,
  } = useQuery<Api<DeviceDetail>, AxiosError>({
    queryKey: [`device.detail.${perangkatId}`, user.token, perangkatId],
    queryFn: getDeviceDetail,
  });

  if (isLoading) return <Loadings />;

  if (isError)
    return (
      <Errors process="mendapatkan data detail perangkat" message={dError} />
    );

  if (isSuccess)
    return (
      <>
        <Outlet />
        <div className="flex justify-between items-center sticky top-16 p-2 sm:p-6 lg:p-8 bg-white rounded-t">
          <div>
            <div className="flex gap-4 items-center">
              <h2 className="font-semibold text-xl">{dDetail.results.name}</h2>
              <p
                className={`capitalize device-status ${dDetail.results.status}`}
              >
                {dDetail.results.status}
              </p>
            </div>

            <p className="text-sm">
              {dDetail.results.ip_addr} - {dDetail.results.powermeter.seri}(
              {dDetail.results.powermeter.brand})
            </p>
          </div>
          <div>
            <PerangkatOptions perangkatId={perangkatId} />
          </div>
        </div>
        <div className="p-2 sm:p-6 lg:p-8">
          <SensorData
            auth={user}
            perangkatId={perangkatId}
            register={dDetail.results.powermeter.register as RegisterItem[]}
          />
        </div>
      </>
    );
}
