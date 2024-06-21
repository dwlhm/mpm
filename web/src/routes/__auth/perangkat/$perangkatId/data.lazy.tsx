import { Link, createLazyFileRoute } from "@tanstack/react-router";
import SensorData from "@/components/SensorData";
import { useAuth } from "@/auth";
import { RegisterItem } from "@/api/register";
import {
  PerangkatSubBody,
  PerangkatSubHeadingPanel,
  PerangkatSubTitle,
} from "@/perangkat/components";
import {
  CompButton,
  CompButtonLinkGroup,
  CompLoading,
  LayoutError,
} from "@/common";
import { useQueryDetailPerangkat } from "@/perangkat/hooks";
import {
  CalendarIcon,
  ChartBarIcon,
  ChevronDownIcon,
  TableCellsIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

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
  } = useQueryDetailPerangkat(user.token, perangkatId);

  if (isLoading) return <CompLoading />;

  if (isError)
    return <LayoutError process="get latest data" message={dError} />;

  if (isSuccess)
    return (
      <>
        <PerangkatSubHeadingPanel>
          <PerangkatSubTitle>Data</PerangkatSubTitle>
        </PerangkatSubHeadingPanel>
        <PerangkatSubBody>
          <div className="mb-2 flex justify-between">
            <CompButton className="w-fit flex gap-4">
              Realtime <ChevronDownIcon className="size-5" />
            </CompButton>
            <div>
              <CompButton className="px-2 w-48">
                From<CalendarIcon className="size-5" />
              </CompButton>
            </div>
            <CompButtonLinkGroup>
              <CompButton>
                <Link
                  to="/perangkat/$perangkatId/data"
                  search={{
                    mode: "grafik",
                  }}
                  params={{ perangkatId }}
                  activeProps={{
                    className: "bg-blue-900"
                  }}
                >
                  <ChartBarIcon className="size-5" />
                  Grafik
                </Link>
              </CompButton>
              <CompButton>
                <Link
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId }}
                  search={{
                    mode: "tabel",
                  }}
                  activeProps={{
                    className: "bg-blue-900"
                  }}
                >
                  <ViewColumnsIcon className="size-5" />
                  Tabel
                </Link>
              </CompButton>
            </CompButtonLinkGroup>
          </div>
          <SensorData
            auth={user}
            perangkatId={perangkatId}
            register={dDetail?.results.powermeter.register as RegisterItem[]}
          />
        </PerangkatSubBody>
      </>
    );
}
