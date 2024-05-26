import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";

export default function Errors(props: { process: string, message: AxiosError | string }) {
    return(
        <div className="flex justify-center items-center gap-3 px-5 py-3 rounded border border-red-500 bg-red-200 w-auto m-auto">
            <ExclamationCircleIcon className="w-8 h-8 text-red-900" />
            <h4 className="text-base font-medium text-red-900 capitalize">Error {props.process}:</h4>
            {
                typeof props.message == "string" 
                    ? <p>{props.message}</p>
                    : <p className="italic text-red-800 text-base">{(props.message.response?.data as { detail: string }).detail}</p>    
            }
        </div>
    )
}