import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "react-query";
import { Api } from "@/api/internal";
import { DeviceDetail, getDeviceDetail } from "@/api/devices";
import SensorData from "@/components/SensorData";
import { useAuth } from "@/auth";
import { AxiosError } from "axios";
import { RegisterItem } from "@/api/register";
import { PerangkatSubBody, PerangkatSubHeadingPanel, PerangkatSubTitle } from "@/perangkat/components";
import { CompLoading, LayoutError } from "@/common";

export const Route = createLazyFileRoute("/__auth/perangkat/$perangkatId/data")(
  {
    component: DataPerangkat,
  },
);

function DataPerangkat() {
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

  if (isLoading) return <CompLoading />;

  if (isError) return <LayoutError process="get latest data" message={dError} />;

  if (isSuccess)
    return (
      <>
        <PerangkatSubHeadingPanel>
          <PerangkatSubTitle>
            Data
          </PerangkatSubTitle>
        </PerangkatSubHeadingPanel>
        <PerangkatSubBody>
        <SensorData
            auth={user}
            perangkatId={perangkatId}
            register={dDetail?.results.powermeter.register as RegisterItem[]}
          />
        </PerangkatSubBody>
      </>
    );
}
