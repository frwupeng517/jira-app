import { cleanObject } from "utils";
import { useEffect } from "react";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { Project } from "./../screens/project-list/list";
export const useProjects = (params?: Partial<Project>) => {
  const http = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(http("projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return result;
};

export const useEditProject = () => {
  const http = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (param: Partial<Project>) => {
    return run(
      http(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const http = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (param: Partial<Project>) => {
    return run(
      http(`projects/${param.id}`, {
        data: param,
        method: "POST",
      })
    );
  };
  return { mutate, ...asyncResult };
};
