import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Gerçek uygulamada mutlaka env'den alınmalı

export const generateToken = (user) => {
  // Hassas bilgileri token'a eklemiyoruz
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role || "user",
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token 7 gün geçerli olacak
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};
