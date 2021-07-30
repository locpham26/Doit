import { request } from "./request";

export const fetchTasks = (params) => {
  return request({
    method: "GET",
    url: "/api/task/task",
    params,
  });
};

export const postTask = (data) => {
  return request({
    method: "POST",
    url: "/api/task/task",
    data,
  });
};

export const patchTask = ({ taskId, data }) => {
  return request({
    method: "PATCH",
    url: `/api/task/task/${taskId}`,
    data,
  });
};

export const deleteTask = ({ taskId }) => {
  return request({
    method: "DELETE",
    url: `/api/task/task/${taskId}`,
  });
};
