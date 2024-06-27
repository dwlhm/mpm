import {
  PerangkatSubBody,
  PerangkatSubHeadingPanel,
  PerangkatSubTitle,
} from "@/perangkat/components";
import { CompPerangkatDateRangeFilter } from "@/perangkat/components/perangkat.date.range.filter";
import { PerangkatFilterBar } from "@/perangkat/layouts";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Dayjs } from "dayjs";
import React from "react";

export const Route = createLazyFileRoute(
  "/__auth/perangkat/$perangkatId/arsip",
)({
  component: PerangkatArsip,
});

function PerangkatArsip() {
  const [_, setIsFilterChanged] = React.useState<boolean>(false);
  const [from, setFrom] = React.useState<Dayjs | null>(null)
  const [to, setTo] = React.useState<Dayjs | null>(null)
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
            onFilterChanged={(b) => setIsFilterChanged(b)} />
        </PerangkatFilterBar>
      </PerangkatSubBody>
    </>
  );
}
