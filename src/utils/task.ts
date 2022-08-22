import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task } from "types/task";

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
