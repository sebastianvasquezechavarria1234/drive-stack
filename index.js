/**
 * @file index.js
 * @description Main entry point for the NodeApiCrud application.
 * @author sebastianvasquezechavarria1234 & Santi Vasquez
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import autoRoutes from "./src/routes/auto.routes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { AppError } from "./src/utils/errors.js";
import { ROUTES } from "./src/utils/constants.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Documentation
app.use(ROUTES.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get(ROUTES.ROOT, (req, res) => {
    res.send("Bienvenido a mi primera API con Node.js profesional y segura! 🛡️🗿");
});

app.use(ROUTES.AUTOS, autoRoutes);

// Health check
app.get(ROUTES.HEALTH, (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

// 404 handler
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`El servidor está levantado en el puerto ${PORT}`);
});