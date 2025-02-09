export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;

export function loadEnv() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }
}

export const API_BASE = "/api/v1";
