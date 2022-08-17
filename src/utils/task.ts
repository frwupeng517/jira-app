import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Task } from "types/task";
export const useTasks = (params?: Partial<Task>) => {
  const http = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    http("tasks", { data: cleanObject(params || {}) })
  );
};
