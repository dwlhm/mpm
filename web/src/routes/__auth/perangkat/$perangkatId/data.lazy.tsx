import { createLazyFileRoute, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import {
  PerangkatSubBody,
  PerangkatSubHeadingPanel,
  PerangkatSubTitle,
} from "@/perangkat/components";
import { CompLoading, LayoutError } from "@/common";
import { useQueryDetailPerangkat, interval_data } from "@/perangkat/hooks";
import { PerangkatFilterBar } from "@/perangkat/layouts";
import React from "react";
import {
  PerangkatDataRepresentation
} from "@/perangkat/layouts/perangkat.data.representation";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { CompPerangkatIntervalFilter } from "@/perangkat/components/perangkat.interval.filter";

export const Route = createLazyFileRoute("/__auth/perangkat/$perangkatId/data")(
  {
    component: DataPerangkat,
  },
);

function DataPerangkat() {
  const user = useAuth();
  const { perangkatId } = Route.useParams();
  const interval = useSearch({
    from: "/__auth/perangkat/$perangkatId/data",
    select: (search: { interval: string }) => {
      if (!search.interval) return "realtime";
      return search.interval;
    },
  });
  const [isFilterChanged, setIsFilterChanged] = React.useState<boolean>(false);

  const {
    isLoading,
    isError,
    isSuccess,
    data: dDetail,
    error: dError,
  } = useQueryDetailPerangkat(user.token, perangkatId);
  
  if (isLoading) return <CompLoading />;

  if (isError)
    return <LayoutError process="get detail perangkat" message={dError} />;

  if (isSuccess)
    return (
      <>
        <PerangkatSubHeadingPanel withoutBackBtn={true}>
          <PerangkatSubTitle className="flex items-center gap-2">
            <CircleStackIcon className="size-5" />
            Data
          </PerangkatSubTitle>
        </PerangkatSubHeadingPanel>
        <PerangkatSubBody>
          
        <PerangkatFilterBar>
          <CompPerangkatIntervalFilter
            perangkatId={perangkatId}
            interval={interval}
            onFilterChanged={(b: boolean) => setIsFilterChanged(b)}
          />
        </PerangkatFilterBar>
          <React.Suspense fallback={<CompLoading />}>
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
              isFilterChanged={isFilterChanged}
              onFilterChanged={(b: boolean) => setIsFilterChanged(b)}
            />
          )}
          </React.Suspense>
        </PerangkatSubBody>
      </>
    );
}
