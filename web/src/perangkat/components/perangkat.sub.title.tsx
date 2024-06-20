import React from "react";
import style from './components.module.css'

export default function PerangkatSubTitle(props: { children: React.ReactNode, className?: string }) {
    return <h3 className={`${style.perangkat_sub_title}${props.className ? ` ${props.className}` : ''}`}>{props.children}</h3>
}