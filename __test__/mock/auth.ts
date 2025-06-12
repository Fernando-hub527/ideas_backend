import jwt from "jsonwebtoken"

export function generateAccessToken(userId: number) {
  return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 604800,
      data: { userId: userId },
    },
    process.env.JWT_SECRET?.toString()!
  );
}
