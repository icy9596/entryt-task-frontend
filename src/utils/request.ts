import { message } from "antd";
import { extend } from "umi-request";
import type {
  ResponseError,
  RequestInterceptor,
  ResponseInterceptor,
} from "umi-request";

import * as devConf from "@/config/dev";
import * as prodConf from "@/config/prod";
import { getToken, clearToken } from "./helper";

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

    // 来自response拦截器 status = 200，code != 0 的情况
    if (status === 200) throw error;

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

const resolveToken: RequestInterceptor = (url, options) => {
  const token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return { url, options };
};
inst.interceptors.request.use(resolveToken);

class FetchError extends Error {
  constructor(public response: Response, public code: Code, public data: any) {
    super("Fetch Error");
  }
}

const checkErrorCode: ResponseInterceptor = async (response) => {
  const { code, msg } = (await response.clone().json()) as ResponseData;
  if (code !== Code.success) {
    message.error(msg);
  }
  return response;
};
const handleResult: ResponseInterceptor = async (response) => {
  const { code, data } = (await response.clone().json()) as ResponseData;
  if (code === Code.success) {
    return data;
  }
  throw new FetchError(response, code, data);
};

inst.interceptors.response.use(checkErrorCode);
inst.interceptors.response.use(handleResult);

export { FetchError };
export default inst;
