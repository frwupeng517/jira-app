import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setSearchParams] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setSearchParams,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const setUrlParams = useSetUrlSearchParam();
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setUrlParams({ projectCreate: false, editingProjectId: "" });
  const startEdit = (id: number) =>
    // setEditingProjectId({ editingProjectId: id });
    setUrlParams({ projectCreate: true, editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
