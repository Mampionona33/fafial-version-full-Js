import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import loginRouter from "./routes/authRoutes";
import reservationRouter from "./routes/reservationRouters";
import salleRouter from "./routes/salleRouter";
import paymentMethodesRouter from "./routes/paymentMethodesRouter";
import http from "http";
import cors from "cors";
import path from "path";
import ErrorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";

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
app.use(ErrorHandler.handleError);
app.use("/api/v1", loginRouter);
app.use("/api/v1", reservationRouter);
app.use("/api/v1", salleRouter);
app.use("/api/v1", paymentMethodesRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
