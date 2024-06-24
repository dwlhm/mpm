import { Api } from "@/api/internal";
import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import {
  DetailPerangkat,
  PerangkatData,
  getDetailPerangkat,
  getPerangkatData,
} from "./api";

export const useQueryDetailPerangkat = (
  token: string | null,
  perangkatId: string,
): UseQueryResult<Api<DetailPerangkat>, AxiosError> => {
  return useQuery<Api<DetailPerangkat>, AxiosError>({
    queryKey: [`device.detail.${perangkatId}`, token, perangkatId],
    queryFn: getDetailPerangkat,
  });
};

export type interval_data =
  | "realtime"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export type UseQueryPerangkatDataProps = {
  token: string | null;
  perangkatId: string;
  onSuccess?: (data: Api<PerangkatData>) => void;
  interval: interval_data;
  from?: string;
  to?: string;
  limit?: number;
};

export const useQueryPerangkatData = (
  q: UseQueryPerangkatDataProps,
): UseQueryResult<Api<PerangkatData>, AxiosError> =>
  useQuery<Api<PerangkatData>, AxiosError>({
    queryKey: [
      `latest.${q.perangkatId}`,
      q.token,
      q.perangkatId,
      q.interval,
      q.limit,
      q.from,
      q.to,
    ],
    queryFn: getPerangkatData,
    retry: false,
    refetchInterval: 2500, // ms
    onSuccess: q.onSuccess,
  });
