import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import store from "#store";

const JWT_SECRET = store.secret.get("appSecret")!;
const SIGN_OPTIONS: SignOptions = {
  expiresIn: store.secret.get("tokenExpiry")!,
};
const SALT_LENGTH = store.secret.get("saltLength");
const KEY_LENGTH = store.secret.get("keyLength");

export function encrypt(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");

  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `${salt}:${hash}`;
}

export function decrypt(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");

  const derived = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(derived, "hex"),
  );
}

export function signToken(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_SECRET, SIGN_OPTIONS);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
