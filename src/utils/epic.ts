import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useDeleteConfig, useAddConfig } from "./use-optimistic-options";
export const useEpics = (params?: Partial<Epic>) => {
  const http = useHttp();
  return useQuery<Epic[]>(["epics", params], () =>
    http("epics", { data: cleanObject(params || {}) })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (param: Partial<Epic>) =>
      http("epics", {
        method: "POST",
        data: param,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    ({ id }: { id: number }) => http(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
