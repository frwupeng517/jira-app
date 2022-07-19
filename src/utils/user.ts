import { useMount } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { User } from "screens/project-list/search-panel";
export const useUsers = () => {
  const http = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(http("users"));
  });

  return result;
};
