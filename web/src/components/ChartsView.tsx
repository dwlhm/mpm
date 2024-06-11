import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { SensorData, getSensorData } from "../api/devices";
import Errors from "./Errors";
import { AxiosError } from "axios";
import Loadings from "./Loadings";
import { Api } from "../api/internal";
import { RegisterItem } from "../api/register";
import { AuthContext } from "../auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartsView(props: {
  register: RegisterItem[];
  perangkatId: string;
  auth: AuthContext;
  repository: number[][];
  last_timestamp: string;
  timestamp_repo: string[];
  set_last_timestamp: (key: string) => void;
}) {
  const { isLoading, isSuccess, isError, data, error } = useQuery<
    Api<SensorData>,
    AxiosError
  >({
    queryFn: getSensorData,
    queryKey: [
      `devices.${props.perangkatId}.data`,
      props.auth.token,
      props.perangkatId,
    ],
    retry: false,
    refetchInterval: 2000,
  });

  if (isLoading) return <Loadings />;

  if (isError)
    return (
      <Errors process="mendapatkan data pembacaan terbaru" message={error} />
    );

  if (data?.results.timestamp !== props.last_timestamp) {
    props.set_last_timestamp(String(data?.results.timestamp));
    props.timestamp_repo.push(
      new Date(props.last_timestamp).toLocaleTimeString(),
    );
    if (props.timestamp_repo.length > 100) {
      props.timestamp_repo.shift();
    }
    console.log(data?.results.data);
    console.log(props.register);
    props.register.forEach((_, i: number) => {
      if (!props.repository[i]) props.repository[i] = [];
      props.repository[i].push(Number(data?.results.data[i]));
      if (props.timestamp_repo.length > 100) {
        props.repository[i].shift();
      }
    });
  }

  if (isSuccess)
    return (
      <>
        <p className="text-sm">
          Diperbaharui pada: {new Date(data.results.timestamp).toLocaleString()}
        </p>
        <div className="grid grid-cols-3 gap-2 mt-6">
          {props.repository.map((v, i) => (
            <div
              key={`data.${i}`}
              className="rounded bg-gray-900 py-4 px-5 text-gray-200"
            >
              <h4 className="text-base font-medium">{props.register[i][3]}</h4>
              <div className="my-1 h-px bg-white/50 mb-2" />
              <div>
                <Line
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  data={{
                    labels: props.timestamp_repo,
                    datasets: [
                      {
                        label: "data",
                        data: v,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                    ],
                  }}
                />
              </div>
              <ul className="live-data max-h-48 overflow-auto">
                {v.map((_, k) => (
                  <li
                    key={`${props.register[i][3]}-${k}`}
                    className="flex justify-between"
                  >
                    <p>
                      {
                        props.repository[i][
                          props.repository[i].length - (k + 1)
                        ]
                      }{" "}
                      {props.register[i][2]}
                    </p>
                    <p>
                      {
                        props.timestamp_repo[
                          props.timestamp_repo.length - (k + 1)
                        ]
                      }
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
}
