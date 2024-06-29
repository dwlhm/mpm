import { RegisterItem } from "@/api/register";
import { useAuth } from "@/auth";
import { CompLoading, LayoutError } from "@/common";
import {
  PerangkatSubBody,
  PerangkatSubHeadingPanel,
  PerangkatSubTitle,
} from "@/perangkat/components";
import { CompPerangkatDateRangeFilter } from "@/perangkat/components/perangkat.date.range.filter";
import { CompPerangkatIntervalFilter, CompPerangkatIntervalFilterBasic } from "@/perangkat/components/perangkat.interval.filter";
import { useQueryDetailPerangkat } from "@/perangkat/hooks";
import { PerangkatFilterBar } from "@/perangkat/layouts";
import { PerangkatArsipInterval, PerangkatArsipRepresentation } from "@/perangkat/layouts/perangkat.arsip.representation";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { createLazyFileRoute } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export const Route = createLazyFileRoute(
  "/__auth/perangkat/$perangkatId/arsip",
)({
  component: PerangkatArsip,
});

function PerangkatArsip() {
  const auth = useAuth();
  const { perangkatId } = Route.useParams();
  
  const {
    data: dDetail
  } = useQueryDetailPerangkat(auth.token, perangkatId);

  const [isFilterChanged, setIsFilterChanged] = React.useState<boolean>(false);
  const [from, setFrom] = React.useState<Dayjs | null>(dayjs().subtract(1, "day"));
  const [to, setTo] = React.useState<Dayjs | null>(dayjs());
  const [interval, setInterval] = React.useState<PerangkatArsipInterval>("hourly");

  return (
    <>
      <PerangkatSubHeadingPanel withoutBackBtn={true}>
        <PerangkatSubTitle className="flex items-center gap-2">
          <ArchiveBoxIcon className="size-5" />
          Arsip
        </PerangkatSubTitle>
      </PerangkatSubHeadingPanel>
      <PerangkatSubBody>
        <PerangkatFilterBar>
          <CompPerangkatDateRangeFilter
            from={from}
            to={to}
            setFrom={(d) => setFrom(d)}
            setTo={(d) => setTo(d)}
            onFilterChanged={(b) => setIsFilterChanged(b)}
          />
          <CompPerangkatIntervalFilterBasic
            interval={interval}
            onIntervalChanged={(b) => setInterval(b)} />
        </PerangkatFilterBar>
        <PerangkatArsipRepresentation
          token={auth.token}
          perangkatId={perangkatId}
          interval={interval}
          from={from}
          to={to}
          register={dDetail?.results.powermeter.register}
        />
      </PerangkatSubBody>
    </>
  );
}
