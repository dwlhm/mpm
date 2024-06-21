import { createLazyFileRoute } from "@tanstack/react-router";
import SensorData from "@/components/SensorData";
import { useAuth } from "@/auth";
import { RegisterItem } from "@/api/register";
import { PerangkatSubBody, PerangkatSubHeadingPanel, PerangkatSubTitle } from "@/perangkat/components";
import { CompLoading, LayoutError } from "@/common";
import { useQueryDetailPerangkat } from "@/perangkat/hooks";

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
  } = useQueryDetailPerangkat(user.token, perangkatId)

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
