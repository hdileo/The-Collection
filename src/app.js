import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(express.json());

// Swagger (FIXED PATH)
const swaggerDocument = YAML.load(
  path.resolve("docs/swagger.yaml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "The Collection API running" });
});

export default app;