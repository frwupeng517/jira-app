// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发

import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_prodiver_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(await res.json());
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(await res.json());
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
