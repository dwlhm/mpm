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
import Loadings from "./Loadings";

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
  title: string;
  timestamp: string[];
  value: number[];
  unit: string;
}) {
  if (props.value == undefined) return <Loadings />
  if (props.value.length <= 0) return <Loadings />;
  return (
    <div className="rounded bg-gray-900 py-4 px-5 text-gray-200">
      <h4 className="text-base font-medium">{props.title}</h4>
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
            labels: props.timestamp,
            datasets: [
              {
                label: "data",
                data: props.value,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </div>
      <ul className="live-data max-h-48 overflow-auto">
        {props.value.map((_, index) => (
          <li key={`live.data.${index}`} className="flex justify-between">
            <p>
              {props.value[props.value.length - (index + 1)]} {props.unit}
            </p>
            <p>{props.timestamp[props.timestamp.length - (index + 1)]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
