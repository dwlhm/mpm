import { Api } from "@/api/internal";
import { AxiosError } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { DetailPerangkat, getDetailPerangkat } from "./api";

export const useQueryDetailPerangkat = (
  token: string | null,
  perangkatId: string,
): UseQueryResult<Api<DetailPerangkat>, AxiosError> => {
  return useQuery<Api<DetailPerangkat>, AxiosError>({
    queryKey: [`device.detail.${perangkatId}`, token, perangkatId],
    queryFn: getDetailPerangkat
  });
};