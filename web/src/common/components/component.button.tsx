import React, { ElementType } from "react";

export interface CompButtonProps {
    className?: string,
    onClick?: () => void,
    children: React.ReactNode,
    as?: ElementType
}

export const CompButton: React.FC<CompButtonProps> = ({ as: TAG = 'button', ...props}) => {
    return (<button 
    className={`bg-gray-900 text-gray-200 text-sm py-2 px-5 w-full text-center rounded${props.className ? ` ${props.className}` : ''}`}
    onClick={props.onClick}
    >
        {props.children}
    </button>)
}