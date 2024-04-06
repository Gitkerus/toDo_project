import { postRequest, getRequest } from "./createRequests";

export const loginRequest = postRequest("/login");
export const loadingTasksData = getRequest("/tasks");
