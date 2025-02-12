import { generateToken, verifyToken } from "authenticator";
import { JWT_SECRET } from "../../config/config";

export enum TotpType {
  auth = "AUTH",
  adminAuth = "ADMIN_AUTH",
}

export function getTotp(phoneNumber: string, type: TotpType) {
  return generateToken(phoneNumber + type + JWT_SECRET!);
}

export function verifyTotp(phoneNumber: string, type: TotpType, otp: string) {
  return verifyToken(phoneNumber + type + JWT_SECRET!, otp);
}
JWT_SECRET;
