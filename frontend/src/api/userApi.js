import { request } from "./request";

export const login = ({ username, password }) => {
  return request({
    method: "POST",
    url: "/api/user/login",
    data: { username, password },
  });
};

export const register = ({ username, password }) => {
  return request({
    method: "POST",
    url: "/api/user",
    data: { username, password },
  });
};
