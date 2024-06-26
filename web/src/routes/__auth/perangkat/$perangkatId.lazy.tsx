import { MatchRoute, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { CompLoading, LayoutError } from "@/common"
import { PerangkatEnergyOverview, PerangkatOptions } from "@/perangkat/layouts"
import { useQueryDetailPerangkat } from "@/perangkat/hooks";

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
  } = useQueryDetailPerangkat(user.token, perangkatId)

  if (isLoading) return <CompLoading />;

  if (isError)
    return (
      <LayoutError process="mendapatkan data detail perangkat" message={dError} />
    );

  if (isSuccess)
    return (
      <>
        <div className="flex justify-between gap-4 items-center sticky top-16 p-2 sm:p-6 lg:p-8 sm:pb-2 lg:pb-2 bg-white rounded-t z-10">
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
        <Outlet />
        <MatchRoute to="/perangkat/$perangkatId">
          <PerangkatEnergyOverview />
        </MatchRoute>
      </>
    );
}
