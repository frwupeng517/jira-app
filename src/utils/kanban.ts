import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import {
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";
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

export interface SortProps {
  fromId: number; // 要重新排序的item
  referenceId: number; // 目标 item
  type: "before" | "after"; // 放在目标 item 的前还是后
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation((params: Partial<SortProps>) => {
    return http("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
