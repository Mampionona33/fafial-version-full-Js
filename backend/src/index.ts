import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import loginRouter from "./routes/authRoutes";
import reservationRouter from "./routes/reservationRouters";
import salleRouter from "./routes/salleRouter";
import paymentMethodesRouter from "./routes/paymentMethodesRouter";
import paymentMethodesFieldsRouter from "./routes/paymentMethodesFieldsRouter";
import http from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import handleError from "./middlewares/ErrorHandler";
import { authenticateToken, verifyToken } from "./middlewares/AuthMiddleware";

const app = express();
const server = http.createServer(app);

// Updated CORS options with specific origin and credentials
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Allow headers required by your requests
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript + Express!");
});
app.use(handleError);
app.use("/api/v1", loginRouter);
app.use("/api/v1", authenticateToken, reservationRouter);
app.use("/api/v1", authenticateToken, salleRouter);
app.use("/api/v1", authenticateToken, paymentMethodesRouter);
app.use("/api/v1", authenticateToken, paymentMethodesFieldsRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
