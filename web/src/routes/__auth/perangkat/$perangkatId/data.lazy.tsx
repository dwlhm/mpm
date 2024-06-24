import {
  createLazyFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import SensorData from "@/components/SensorData";
import { useAuth } from "@/auth";
import { RegisterItem } from "@/api/register";
import {
  PerangkatSubBody,
  PerangkatSubHeadingPanel,
  PerangkatSubTitle,
} from "@/perangkat/components";
import { CompLoading, LayoutError } from "@/common";
import { useQueryDetailPerangkat, interval_data } from "@/perangkat/hooks";
import { PerangkatFilterBar } from "@/perangkat/layouts";
import React from "react";
import { Dayjs } from "dayjs";
import { PerangkatDataRepresentation } from "@/perangkat/layouts/perangkat.data.representation";

export const Route = createLazyFileRoute("/__auth/perangkat/$perangkatId/data")(
  {
    component: DataPerangkat,
  },
);

function DataPerangkat() {
  const user = useAuth();
  const { perangkatId } = Route.useParams();

  const [mode, interval] = useSearch({
    from: "/__auth/perangkat/$perangkatId/data",
    select: (search: { mode: string; interval: string }) => {
      if (!search.mode && search.interval != undefined)
        return ["grafik", search.interval];
      if (search.mode != undefined && !search.interval)
        return [search.mode, "realtime"];
      if (!search.mode && !search.interval) return ["grafik", "realtime"];
      return [search.mode, search.interval];
    },
  });

  const {
    isLoading,
    isError,
    isSuccess,
    data: dDetail,
    error: dError,
  } = useQueryDetailPerangkat(user.token, perangkatId);

  const [from, setFrom] = React.useState<Dayjs | null>(null);
  const [to, setTo] = React.useState<Dayjs | null>(null);
  const [filterChanged, setFilterChanged ] = React.useState<boolean>(true)

  if (isLoading) return <CompLoading />;

  if (isError)
    return <LayoutError process="get detail perangkat" message={dError} />;

  if (isSuccess)
    return (
      <>
        <PerangkatSubHeadingPanel>
          <PerangkatSubTitle>Data</PerangkatSubTitle>
        </PerangkatSubHeadingPanel>
        <PerangkatSubBody>
          <PerangkatFilterBar
            perangkatId={perangkatId}
            from={from}
            setFrom={(data) => setFrom(data)}
            to={to}
            setTo={(data) => setTo(data)}
            mode={mode}
            interval={interval}
            filterChanged={(b: boolean) => setFilterChanged(b)}
          />
          {!dDetail?.results.powermeter.register ? (
            <LayoutError
              process="get register list"
              message="Register untuk Powermeter yang digunakan belum tersedia"
            />
          ) : (
            <PerangkatDataRepresentation
              token={user.token}
              perangkatId={perangkatId}
              interval={interval as interval_data}
              register={dDetail?.results.powermeter.register}
              from={from?.toISOString()}
              to={to?.toISOString()}
              isFilterChanged={filterChanged}
              onFilterChanged={(b: boolean) => setFilterChanged(b)}
            />
          )}
        </PerangkatSubBody>
      </>
    );
}
