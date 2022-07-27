import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
  const [param, setSearchParams] = useUrlQueryParam(["name", "personId"]);
  console.log("111");
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setSearchParams,
  ] as const;
};
