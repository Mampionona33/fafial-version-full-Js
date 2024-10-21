import { PrismaClient } from "@prisma/client";
import { NextFunction, Request } from "express";

class UserController {
  private static prisma: PrismaClient;
  static init(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  public static async getUserBytocken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      console.error("UserController.getUserBytocken", error);
      next(error);
    }
  }
}

export default UserController;
