import { useProjectSearchParams } from "./../screens/project-list/util";
import { cleanObject } from "utils";
import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/project";
export const useProjects = (params?: Partial<Project>) => {
  const http = useHttp();
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(
  //   () => http("projects", { data: cleanObject(params || {}) }),
  //   [http, params]
  // );
  // useEffect(() => {
  //   run(fetchProjects(), { refresh: fetchProjects });
  // }, [params, run, fetchProjects]);
  // return result;
  return useQuery<Project[]>(["projects", params], () =>
    http("projects", { data: cleanObject(params || {}) })
  );
};

export const useEditProject = () => {
  const http = useHttp();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (param: Partial<Project>) => {
  //   return run(
  //     http(`projects/${param.id}`, {
  //       data: param,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
  const queryClient = useQueryClient();
  // const [searchParams] = useProjectSearchParams();
  // const queryKey = ["projects", searchParams];
  return useMutation(
    (param: Partial<Project>) =>
      http(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
      /*
      // 使用 react-query 实现乐观更新
      // mutate 发生时立马调用
      async onMutate(target) {
        console.log("111");
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return { previousItems };
      },
      // 出错时回滚掉上一步擅自修改的内容
      onError(error, newItem, context) {
        console.log("222");
        queryClient.setQueryData(queryKey, context?.previousItems);
      },
      */
    }
  );
};

export const useAddProject = () => {
  const http = useHttp();
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (param: Partial<Project>) => {
  //   return run(
  //     http(`projects/${param.id}`, {
  //       data: param,
  //       method: "POST",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      http("projects", {
        method: "POST",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const http = useHttp();
  return useQuery<Project>(["project", { id }], () => http(`projects/${id}`), {
    enabled: !!id, // 表示只有id存在的时候才会发起接口调用
  });
};
