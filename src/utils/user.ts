import { useMount } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { User } from "types/user";
export const useUsers = () => {
  const http = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(http("users"));
  });

  return result;
};
