export enum ERROR_TYPE {
  UNAUTHORIZED,
  USER_ALREADY_EXISTS,
  UNKNOWN_ERROR,
  USER_NOT_FOUND,
  INVALID_REQUEST,
  INTERNAL_SERVER_ERROR,
}

export function getErrorTypeId(errorType: ERROR_TYPE): string {
  switch (errorType) {
    case ERROR_TYPE.UNAUTHORIZED:
      return "UNAUTHORIZED";
    case ERROR_TYPE.USER_ALREADY_EXISTS:
      return "USER_ALREADY_EXISTS";
    case ERROR_TYPE.UNKNOWN_ERROR:
      return "UNKNOWN_ERROR";
    case ERROR_TYPE.USER_NOT_FOUND:
      return "USER_NOT_FOUND";
    case ERROR_TYPE.INVALID_REQUEST:
      return "INVALID_REQUEST";
    case ERROR_TYPE.INTERNAL_SERVER_ERROR:
      return "INTERNAL_SERVER_ERROR";
  }
}

export function getErrorTypeMessage(
  errorType: ERROR_TYPE,
  message?: string
): string {
  if (message) {
    return message;
  }

  switch (errorType) {
    case ERROR_TYPE.UNAUTHORIZED:
      return "Unauthorized";
    case ERROR_TYPE.USER_ALREADY_EXISTS:
      return "User already exists";
    case ERROR_TYPE.UNKNOWN_ERROR:
      return "Unknown error";
    case ERROR_TYPE.USER_NOT_FOUND:
      return "User not found";
    case ERROR_TYPE.INVALID_REQUEST:
      return "Invalid request";
    case ERROR_TYPE.INTERNAL_SERVER_ERROR:
      return "Internal server error";
    default:
      return "Unknown error";
  }
}
