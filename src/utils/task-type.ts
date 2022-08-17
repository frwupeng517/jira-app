import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskTypes } from "types/task-type";
export const useTaskTypes = () => {
  const http = useHttp();
  return useQuery<TaskTypes[]>(["taskTypes"], () => http("taskTypes"));
};
