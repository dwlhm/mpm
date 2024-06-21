import React from "react"
import style from "./layout.module.css"

export const LayoutCardPanel = (props: { children: React.ReactNode, className?: string }) => {
    return(
        <div
          className={`${style.card_panel} grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4${props.className ? ` ${props.className}` : ''}`}
        >
            {props.children}
        </div>
    )
}