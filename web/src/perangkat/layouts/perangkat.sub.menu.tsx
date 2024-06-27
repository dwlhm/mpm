import React from "react";

export const PerangkatSubMenu = (props: { children: React.ReactNode, className?: string }) => {
    return(
        <nav className={`flex overflow-hidden mb-3 w-full rounded bg-gray-200/60${props.className ? ` ${props.className}` : ''}`}>
            {props.children}
        </nav>
    )
}