import axios from "axios";

const baseUrl = process.env.REACT_APP_REQUEST_BASEURL;

export const postRequest = (path) => async (data) => {
  const response = axios.post(baseUrl + path, data).catch((err) => {
    console.warn(err);
  });
  return response;
};

export const getRequest =
  (path) =>
  async (urlParams = null) => {
    const requestUrl = urlParams
      ? `${baseUrl}${path}?` + new URLSearchParams(urlParams)
      : `${baseUrl}${path}`;
    const response = axios.get(requestUrl).catch((err) => {
      console.warn(err);
    });
    return response;
  };
