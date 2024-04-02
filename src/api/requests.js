import axios from "axios";

const baseUrl = "http://localhost:3000";

export const loadTasks = async (authorId) => {
  const params = `?author=${authorId}`;
  const response = axios.get(baseUrl + "/tasks/" + params).catch((err) => {
    console.warn(err);
  });
  return response;
};

export const loadSingleTask = async (authorId, taskId) => {
  const params = `?author=${authorId}&id=${taskId}`;
  const response = axios.get(baseUrl + "/tasks/" + params).catch((err) => {
    console.warn(err);
  });
  return response;
};

export const loginRequest = async (email, password) => {
  const response = axios
    .post(baseUrl + "/login", {
      email: email,
      password: password,
    })
    .catch((err) => {
      console.warn(err);
    });
  return response;
};
