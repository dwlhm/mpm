import React from "react";

export default function PerangkatSubBody(props: {children: React.ReactNode, className?: string}) {
    return(
        <div className={`p-2 sm:px-6 lg:px-8 ${props.className || ''}`}>
            {props.children}
        </div>
    )
}