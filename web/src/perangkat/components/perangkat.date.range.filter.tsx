import { CompButton } from "@/common";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export type CompPerangkatDateRangeFilterProps = {
  from: Dayjs | null;
  setFrom: (d: Dayjs | null) => void;
  to: Dayjs | null;
  setTo: (d: Dayjs | null) => void;
  onFilterChanged: (b: boolean) => void;
};

export const CompPerangkatDateRangeFilter = (
  props: CompPerangkatDateRangeFilterProps,
) => {
  const resetDatetime = () => {
    props.onFilterChanged(true);
    props.setFrom(dayjs().subtract(1, "day"));
    props.setTo(dayjs());
  };
  return (
    <div className={`date_time flex bg-gray-900 rounded text-gray-200`}>
      <DateTimePicker
        label="Dari"
        value={props.from}
        onChange={(newValue) => {
          props.setFrom(newValue);
          props.onFilterChanged(true);
        }}
      />
      <DateTimePicker
        label="Hingga"
        value={props.to}
        onChange={(newValue) => {
          props.setTo(newValue);
          props.onFilterChanged(true);
        }}
      />
      {props.from && (
        <CompButton
          className="border border-white rounded-full m-2"
          onClick={resetDatetime}
        >
          Reset
        </CompButton>
      )}
    </div>
  );
};
