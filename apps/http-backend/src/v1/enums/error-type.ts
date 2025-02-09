export enum ERROR_TYPE {
  UNAUTHORIZED,
  UNKNOWN_ERROR,
}

export function getErrorTypeMessage(errorType: ERROR_TYPE): string {
  switch (errorType) {
    case ERROR_TYPE.UNAUTHORIZED:
      return "Unauthorized";
    case ERROR_TYPE.UNKNOWN_ERROR:
      return "Unknown error";
    default:
      return "Unknown error";
  }
}
