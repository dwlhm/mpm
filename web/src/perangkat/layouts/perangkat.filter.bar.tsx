import React from "react";

type PerangkatFilterBarProps = {
  children: React.ReactNode;
};

export const PerangkatFilterBar = (props: PerangkatFilterBarProps) => {
  return (
    <div className="mt-2 my-5 flex justify-between">
      <div className="flex gap-2">{props.children}</div>
    </div>
  );
};
