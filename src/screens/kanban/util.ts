import { useMemo } from "react";
import { useUrlQueryParam } from "./../../utils/url";
import { useLocation } from "react-router";
import { useProject } from "utils/project";

/*
获取路由中的id

注意：把 \d 用括号包起来才会额外把id存在数组中

var pathname = 'www.google.com/projects/123456'
pathname.match(/projects\/(\d+)/)
(2) ['projects/123456', '123456', index: 15, input: 'www.google.com/projects/123456', groups: undefined]

var pathname = 'www.google.com/projects/123456'
pathname.match(/projects\/\d+/)
['projects/123456', index: 15, input: 'www.google.com/projects/123456', groups: undefined]
*/
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      tagId: Number(param.tagId) || undefined,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
