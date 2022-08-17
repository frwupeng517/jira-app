import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
export const useKanbans = (params?: Partial<Kanban>) => {
  const http = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    http("kanbans", { data: cleanObject(params || {}) })
  );
};
