import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import loginRouter from "./routes/authRoutes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript + Express!");
});

app.use("/api/v1", loginRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
