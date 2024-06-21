import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";

export const LayoutError = (props: {
  process: string;
  message: AxiosError | string;
  action?: React.ReactNode | null;
  className?: string;
}) => {
  const err_msg: string | string[] =
    typeof props.message == "string"
      ? props.message
      : (props.message.response?.data as { detail: string }).detail;
  return (
    <div
      className={`flex justify-center items-center gap-3 px-5 py-3 rounded border border-red-500 bg-red-200 w-auto m-auto ${props.className}`}
    >
      <ExclamationCircleIcon className="w-8 h-8 text-red-900" />
      <h4 className="text-base font-medium text-red-900 capitalize">
        Error {props.process}:
      </h4>
      <p className="italic text-red-800 text-base">
        {typeof err_msg == "string" ? err_msg : "system error"}
      </p>
      {props.action}
    </div>
  );
}
