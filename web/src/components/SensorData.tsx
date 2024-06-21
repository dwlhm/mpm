import Loadings from "./Loadings";
import { AuthContext } from "../auth";
import { RegisterItem } from "../api/register";
import { useQuery } from "react-query";
import { SensorData as SensorDataInf, getSensorData } from "../api/devices";
import Errors from "./Errors";
import { Api } from "../api/internal";
import { AxiosError } from "axios";
import ChartsView from "./ChartsView";

export interface RepositoryInf {
  [key: string]: number[];
}

let localRepo: RepositoryInf = {};
let localTimestamp: string[] = [];
let lastTimestamp: string = "";
let idLast: string = "";

export default function SensorData(props: {
  auth: AuthContext;
  perangkatId: string;
  register: RegisterItem[];
}) {
  const { isLoading, isError, isSuccess, error } = useQuery<
    Api<SensorDataInf>,
    AxiosError
  >({
    queryKey: [
      `latest.${props.perangkatId}`,
      props.auth.token,
      props.perangkatId,
    ],
    queryFn: getSensorData,
    retry: false,
    refetchInterval: 1000,
    onSuccess: (data) => {
      if (
        data.results.timestamp != lastTimestamp &&
        idLast == props.perangkatId
      ) {
        lastTimestamp = data.results.timestamp;

        props.register.forEach((item) => {
          if (localRepo[item[4]] == undefined) localRepo[item[4]] = [];
          localRepo[item[4]].push(data.results.data[item[4]]);
        });
        localTimestamp.push(
          new Date(data.results.timestamp).toLocaleTimeString(),
        );
      }
      if (idLast !== props.perangkatId) {
        idLast = props.perangkatId;
        props.register.forEach((item) => {
          localRepo[item[4]] = [];
          localTimestamp = [];
          return () => {
            localRepo[item[4]] = [];
            localTimestamp = [];
            lastTimestamp = "";
          };
        });
      }
    },
  });

  if (isLoading) return <Loadings />;
  if (isError)
    return <Errors process="get latest sensor data" message={error} />;
  if (isSuccess) {
    return (
      <>
        <div className="grid sm:grid-cols-3 gap-2">
          {props.register.map((item) => (
            <ChartsView
              title={item[3]}
              value={localRepo[item[4]]}
              unit={item[2]}
              timestamp={localTimestamp}
              key={`data.sensor.${item[3]}`}
            />
          ))}
        </div>
      </>
    );
  }
}
