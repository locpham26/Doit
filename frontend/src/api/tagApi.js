import { request } from "./request";

export const fetchTags = (params) => {
  return request({
    method: "GET",
    url: "/api/task/tag",
    params,
  });
};

export const postTag = (data) => {
  return request({
    method: "POST",
    url: "/api/task/tag",
    data,
  });
};

export const patchTag = ({ tagId, data }) => {
  return request({
    method: "PATCH",
    url: `/api/task/tag/${tagId}`,
    data,
  });
};

export const deleteTag = ({ tagId }) => {
  return request({
    method: "DELETE",
    url: `/api/task/tag/${tagId}`,
  });
};
