import Loadings from "./Loadings";
import ChartsView from "./ChartsView";
import { useRegisterQuery } from "./powermeter/hooks";
import { AuthContext } from "src/auth";
import React from "react";

export default function SensorData(props: {
  auth: AuthContext;
  perangkatId: string;
  powermeterId: string;
}) {
  const {data: rQuery, isLoading} = useRegisterQuery(props.auth, props.powermeterId);

  let repository: number[][] = [];
  let [last_timestamp, setLast_timestamp]= React.useState("");
  let timestamp_repo: string[] = [];
  const set_last_timestamp = (key: string) => {
    setLast_timestamp(key)
  }

  if (isLoading) return <Loadings />;
  else
    return (
      <ChartsView
        register={rQuery}
        perangkatId={props.perangkatId}
        auth={props.auth}
        repository={repository}
        last_timestamp={last_timestamp}
        timestamp_repo={timestamp_repo}
        set_last_timestamp={set_last_timestamp}
      />
    );
}
