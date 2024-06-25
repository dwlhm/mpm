import { RegisterItem } from "@/api/register";
import { interval_data, useQueryPerangkatData } from "../hooks";
import { PerangkatData } from "../api";
import { Api } from "@/api/internal";
import { CompLoading, LayoutError } from "@/common";
import { LayoutPerangkatCard } from "./perangkat.card";
import { CompPerangkatLineChart } from "../components";
import { CompPerangkatTable } from "../components/perangkat.table";

export interface RepositoryInf {
  [key: string]: number[];
}

let GLOBAL_DATA: PerangkatData = {
  data: {},
  timestamp: [],
  length: 0,
};

let current_perangkat = "";
let firstTime = false;

export type PerangkatDataRepresentationMode = "grafik" | "table"

export type PerangkatDataRepresentationProps = {
  token: string | null;
  perangkatId: string;
  register: RegisterItem[];
  interval: interval_data;
  from?: string;
  to?: string;
  isFilterChanged: boolean;
  onFilterChanged: (b: boolean) => void;
  mode: PerangkatDataRepresentationMode;
};

export const PerangkatDataRepresentation = (
  props: PerangkatDataRepresentationProps,
) => {
  if (current_perangkat != props.perangkatId) {
    firstTime = true;
    current_perangkat = props.perangkatId;
  }
  if (props.isFilterChanged) {
    props.onFilterChanged(false);
    // props.isFilterChanged = false
    GLOBAL_DATA = {
      data: {},
      timestamp: [],
      length: 0,
    };
    firstTime = true;
  }

  const q = useQueryPerangkatData({
    token: props.token,
    perangkatId: props.perangkatId,
    limit: firstTime ? (props.from ? undefined : 10) : 1,
    from: props.from,
    to: props.to,
    interval: props.interval,
    onSuccess: (res: Api<PerangkatData>) => {
      if (firstTime) {
        GLOBAL_DATA = res.results;
        firstTime = false;
        return;
      }
      const currData = res.results;
      if (
        currData.timestamp[currData.length - 1] !=
        GLOBAL_DATA.timestamp[GLOBAL_DATA.length - 1]
      ) {
        Object.keys(currData.data).forEach((key) => {
          GLOBAL_DATA.data[key] = [
            ...GLOBAL_DATA.data[key],
            ...currData.data[key],
          ];
        });
        GLOBAL_DATA.timestamp = [
          ...GLOBAL_DATA.timestamp,
          ...currData.timestamp,
        ];
        GLOBAL_DATA.length += currData.length;
      }
    },
  });

  if (q.isLoading) return <CompLoading />;

  if (q.isError)
    return <LayoutError process="get data perangkat" message={q.error} />;

  if (q.isSuccess)
    return (
      <>
        <div className="grid sm:grid-cols-3 gap-2">
          {props.register.map((item) => (
            <LayoutPerangkatCard>
              <h4 className="text-base font-medium">{item[3]}</h4>
              <div className="my-1 h-px bg-white/50 mb-2" />
              {props.mode == "grafik" ? (
                <CompPerangkatLineChart
                  value={GLOBAL_DATA.data[item[4]]}
                  timestamp={GLOBAL_DATA.timestamp.map((d) =>
                    new Date(d).toLocaleTimeString(),
                  )}
                />
              ) : (
                <CompPerangkatTable 
                value={GLOBAL_DATA.data[item[4]]}
                timestamp={GLOBAL_DATA.timestamp.map((d) =>
                  new Date(d).toLocaleString(),
                )} 
                unit={item[2]}/>
              )}
            </LayoutPerangkatCard>
          ))}
        </div>
      </>
    );
};
