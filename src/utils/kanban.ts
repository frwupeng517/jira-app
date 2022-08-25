import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import { useDeleteConfig } from "./use-optimistic-options";
export const useKanbans = (params?: Partial<Kanban>) => {
  const http = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    http("kanbans", { data: cleanObject(params || {}) })
  );
};

export const useAddKanban = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Kanban>) =>
      http("kanbans", {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    ({ id }: { id: number }) => http(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
