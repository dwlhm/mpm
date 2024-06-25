export type CompPerangkatTable = {
  value: number[];
  unit: string;
  timestamp: string[];
};

export const CompPerangkatTable = (props: CompPerangkatTable) => {
  return (
    <ul className="live-data max-h-96 overflow-auto">
      {props.value.map((_, index) => (
        <li key={`live.data.${index}`} className="flex justify-between">
          <p>
            {props.value[props.value.length - (index + 1)]} {props.unit}
          </p>
          <p>{props.timestamp[props.timestamp.length - (index + 1)]}</p>
        </li>
      ))}
    </ul>
  );
};
