import React from "react"

export const LayoutBasic = (props: { children: React.ReactNode }) => {
    return(
        <div className={`flex grow w-full bg-blue-900 flex-col sm:flex-row`}>
            {props.children}
        </div>
    )
}

export const LayoutBasicMainPanel = (props: { children: React.ReactNode }) => {
    return(
        <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
            {props.children}
        </div>
    )
}