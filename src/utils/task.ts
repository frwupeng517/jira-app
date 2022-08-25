import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "types/task";
import { useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useTasks = (params?: Partial<Task>) => {
  const http = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    http("tasks", { data: cleanObject(params || {}) })
  );
};

export const useAddTask = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Task>) =>
      http("tasks", {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};

// 获取任务详情
export const useTask = (id?: number) => {
  const http = useHttp();
  return useQuery<Task>(["task", { id }], () => http(`tasks/${id}`), {
    enabled: !!id, // 表示只有id存在的时候才会发起接口调用
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    ({ id }: { id: number }) => http(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
