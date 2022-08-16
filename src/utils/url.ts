import { cleanObject } from "./index";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          console.log("key", key);
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in T]: string }),
      // TODO 如果这里直接把 keys 添加到依赖项，就会造成无限渲染，除非keys是一个state
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};
