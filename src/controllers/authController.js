import * as service from "../services/authServices.js";

export const signup = async (req, res) => {
  try {
    const user = await service.signup(
      req.body.username,
      req.body.email,
      req.body.password
    );

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await service.login(
      req.body.email,
      req.body.password
    );

    res.json({ token });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};