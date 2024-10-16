import { PrismaClient } from "@prisma/client";
import { Request } from "express";

class UserController {
  private static prisma: PrismaClient;
  static init(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  public static async getUserBytocken(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}

export default UserController;
