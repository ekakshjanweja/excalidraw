export enum ERROR_TYPE {
  UNAUTHORIZED,
  USER_ALREADY_EXISTS,
  UNKNOWN_ERROR,
  USER_NOT_FOUND,
}

export function getErrorTypeMessage(errorType: ERROR_TYPE): string {
  switch (errorType) {
    case ERROR_TYPE.UNAUTHORIZED:
      return "Unauthorized";
    case ERROR_TYPE.USER_ALREADY_EXISTS:
      return "User already exists";
    case ERROR_TYPE.UNKNOWN_ERROR:
      return "Unknown error";
    case ERROR_TYPE.USER_NOT_FOUND:
      return "User not found";
    default:
      return "Unknown error";
  }
}
