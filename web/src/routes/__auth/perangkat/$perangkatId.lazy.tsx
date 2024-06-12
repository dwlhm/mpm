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
      <div className="grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow">
        <Outlet />
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-xl">{dDetail.results.name}</h2>
            <p className="text-sm">
              {dDetail.results.ip_addr} - {dDetail.results.powermeter.seri}(
              {dDetail.results.powermeter.brand})
            </p>
          </div>
          <div>
            <PerangkatOptions perangkatId={perangkatId} />
          </div>
        </div>
        <SensorData
          auth={user}
          perangkatId={perangkatId}
          register={dDetail.results.powermeter.register as RegisterItem[]}
        />
      </div>
    );
}
