import { getErrorTypeMessage, type ERROR_TYPE } from "./enums/error_type";
import { STATUS } from "./enums/status";

export interface ApiResponse<T = "unknown"> {
  data: T;
  status: STATUS;
}

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: STATUS.SUCCESS,
  };
}

export function errorResponse(error: ERROR_TYPE): ApiResponse<{
  error: ERROR_TYPE;
  message: string;
}> {
  return {
    data: {
      error,
      message: getErrorTypeMessage(error),
    },
    status: STATUS.ERROR,
  };
}
