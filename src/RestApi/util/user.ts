import { Login } from "../../database/login/login";
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
import jwt from "jsonwebtoken";
export async function loginCheckOfLinkeDin(email: string) {
  return await Login.findOne({
    where: { email },
  });
}

export async function jwtSignToken(token: string) {
  const secret = env.JWT_SECRET;
  
  return await jwt.sign(token, secret);
}
