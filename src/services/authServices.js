import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/userRepo.js";

export async function signup(username, email, password) {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User exists");

  const hashed = await bcrypt.hash(password, 10);

  return userRepo.create({
    username,
    email,
    password: hashed,
  });
}

export async function login(email, password) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}