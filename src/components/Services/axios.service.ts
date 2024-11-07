import axios from "axios";
import store from "../../redux/app/store";
import { API_HOST, RESPONSES } from "../../utils/constants";
import { formatUrl } from "./comman.service";
import { logoutUser } from "../../redux/features/reducers/user.slice";
import toast from "react-hot-toast";

export const storeInstance = store;
axios.defaults.baseURL = API_HOST;

let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**AXIOS INTERCEPTOR */
axios.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error: any) => {
    return error;
  }
);

/**HANDLE AXIOS RESPONSE */
axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (!error.response) {
    } else {
      return manageErrorConnection(error);
    }

    const originalRequest = error.config;
    failedQueue.push(originalRequest);
    if (error.response.status === 403) {
      processQueue(error, null);
    }
  }
);
/**HANDLE AXIOS ERROR */
function manageErrorConnection(err: any) {
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    if (err.response.status === 401) {
      setTimeout(function () {
        store.dispatch(logoutUser());
      }, 1000);
    }
    return Promise.reject(err);
  } else if (err.code === "ECONNREFUSED") {
    return "nevermind";
  } else {
    return Promise.reject(err);
  }
}

/**METHOD FOR CALL API */
export const apiCallPost = (
  url: any,
  data: any,
  params = {},
  showtoaster = false
) =>
  new Promise((resolve) => {
    axios
      .post(formatUrl(url, params), data)
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((error: any) => {
        resolve(null);
      });
  });

/**METHOD FOR SEND API */
export const apiCallGet = (url: any, params = {}, showtoaster = false) =>
  new Promise((resolve) => {
    axios
      .get(formatUrl(url, params))
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((error: any) => {
        resolve(null);
      });
  });
