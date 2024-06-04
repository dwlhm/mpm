import { Outlet, Link } from "@tanstack/react-router";
import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import React from "react";

export interface SideNavData {
    label: string,
    link: string,
    icon?: React.ReactNode
}

export default function SideNav(props: { data: SideNavData[] }) {
    return(
        <div className={`max-w-64 sticky top-16 bottom-0 h-[calc(100vh-4rem)] w-full p-2 overflow-auto`}>
            <div className={`grid gap-4`}>
                {props.data.map((data, index) => {
                    return (
                        <Link 
                        key={index}
                        to={data.link}
                        className={`perangkat transition py-2 px-3 flex items-center gap-3 text-gray-100 hover:bg-gray-800/50 hover:rounded`}>
                        { data.icon || <RectangleGroupIcon className={`w-6 h-6 text-white/60`} /> }
                        <div>
                            <h4 className='font-medium text-lg mb-1 capitalize'>{data.label}</h4>
                        </div>
                        </Link>)
                    })
                }
            </div>
        </div>
    )
}