import React from "react"
import style from "./components.module.css"

export const CompButtonLinkGroup = (props: { children: React.ReactNode, className?: string }) => {
    return(
        <div className={`${style.btn_group} flex`}>
            { props.children }
        </div>
    )
}