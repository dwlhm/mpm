import React from "react";

type PerangkatFilterBarProps = {
  children: React.ReactNode;
};

export const PerangkatFilterBar = (props: PerangkatFilterBarProps) => {
  return (
    <div className="mt-2 my-5">
      <div className="flex gap-2 justify-between">{props.children}</div>
    </div>
  );
};
