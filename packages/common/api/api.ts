import {
  getErrorTypeId,
  getErrorTypeMessage,
  type ERROR_TYPE,
} from "../enums/error_type";
import { STATUS } from "../enums/status";

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

export function errorResponse({
  error,
  message,
}: {
  error: ERROR_TYPE;
  message?: string;
}): ApiResponse<{
  error: string;
  message: string;
}> {
  return {
    data: {
      error: getErrorTypeId(error),
      message: getErrorTypeMessage(error, message),
    },
    status: STATUS.ERROR,
  };
}
