import { jwtVerify, SignJWT } from "jose";
import { compare, hash } from "bcrypt";

const authSecretKey = process.env.AUTH_SECRET;
const authKey = new TextEncoder().encode(authSecretKey);
const EXPIRATION_TIME = "30 days";

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(authKey);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, authKey, {
    algorithms: ["HS256"],
  });

  return payload;
}

const SALT_ROUNDS = 10;

export function hashPassword(plainTextPassword: string) {
  return hash(plainTextPassword, SALT_ROUNDS);
}

export async function comparePassword(
  plainTextPassword: string,
  hashedPassword: string,
) {
  return compare(plainTextPassword, hashedPassword);
}
