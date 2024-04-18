import axios from "axios";
import { onRequestError, onRequestFulfilled } from "./requestHandler";
import { OnResponse, onResponseError } from "./responseHandler";

// export default axios.create({
//   baseURL: import.meta.env.VITE_API_DEPARTMENT_URL,
// });

export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosPrivate.interceptors.request.use(onRequestFulfilled, onRequestError);
// axiosPrivate.interceptors.response.use(OnResponse, onResponseError);
