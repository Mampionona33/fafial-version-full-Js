import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(401).json({ message: "Incorrect email or password" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Incorrect email or password" });
        return;
      }

      if (!JWT_SECRET) {
        next("JWT secret key not defined in environment variables.");
        return;
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, message: "Login successful" });
    } catch (error) {
      console.error(error);
      next(error); // Pass error to the next middleware
    }
  }

  public static async getAuthenticatedUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        res.status(401).json({ message: "Token is missing" });
        return;
      }

      if (!JWT_SECRET) {
        throw new Error("JWT secret key not defined in environment variables.");
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (!decoded || !decoded.userId) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { roles: true },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default AuthController;
