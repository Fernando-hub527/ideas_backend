import jwt from "jsonwebtoken"
import argon2 from "argon2";

export function generateAccessToken(userId: number) {
  return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 604800,
      data: { userId: userId },
    },
    process.env.JWT_SECRET?.toString()!
  );
}

export function generatePassword(pass: string){
  return argon2.hash(pass, {type: argon2.argon2id})
}