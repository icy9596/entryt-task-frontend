import { message } from "antd";
import { extend, type ResponseError } from "umi-request";

import * as devConf from "@/config/dev";
import * as prodConf from "@/config/prod";
import { getTokenFromStorage, clearToken } from "./helper";

enum Code {
  success = 0,
  fail = 1,
}

interface ResponseData<T = any> {
  code: Code;
  data: T | null;
  msg: string | null;
}

const errorHandler = (error: ResponseError<ResponseData>) => {
  if (error.response) {
    const {
      response: { status, statusText },
    } = error;
    switch (status) {
      case 401:
        message.error("认证已过期，请重新认证");
        clearToken();
        break;
      case 500:
        message.error(statusText || "服务器发生错误");
        break;
      default:
        message.error("请求发生错误，请稍后重试");
    }
  } else {
    message.error(error.message);
  }
  throw error;
};

const inst = extend({
  prefix:
    process.env.NODE_ENV === "development"
      ? devConf.API_HOST
      : prodConf.API_HOST,
  errorHandler,
});

inst.interceptors.request.use((url, options) => {
  const token = getTokenFromStorage();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return { url, options };
});

inst.interceptors.response.use(async (response) => {
  const { code, data, msg } = (await response.clone().json()) as ResponseData;
  if (code === Code.success) {
    return data;
  } else {
    message.error(msg);
    return Promise.reject(new Error(msg || '服务器发生错误'));
  }
});

export default inst;
