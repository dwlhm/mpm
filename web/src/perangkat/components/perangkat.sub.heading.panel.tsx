import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "@tanstack/react-router";
import React from "react";

export default function PerangkatSubHeadingPanel(props: { children: React.ReactNode, withoutBackBtn?: boolean }) {
    const { history } = useRouter()
    const goBack = () => history.back()
    return(
        <div className="p-2 sm:px-6 lg:px-8 flex gap-3 items-center">
            {
                !props.withoutBackBtn && <button className="bg-blue-900/15 rounded-full p-2" onClick={goBack}><ChevronLeftIcon className="size-4" /></button>
            }
            
            {props.children}
        </div>
    )
}