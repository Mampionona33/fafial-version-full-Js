import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

// Récupération de la clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

class AuthController {
  // Méthode de connexion
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Recherche de l'utilisateur dans la base de données par email
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // Si l'utilisateur n'existe pas, renvoyer une erreur 401
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Comparer le mot de passe avec celui stocké en base
      const isMatch = await bcrypt.compare(password, user.password);

      // Si les mots de passe ne correspondent pas, renvoyer une erreur 401
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      if (!JWT_SECRET) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }

      // Si la connexion est réussie, générer un token JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h", // Exemple d'expiration du token
      });

      // Retourner le token
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Méthode pour récupérer l'utilisateur à partir du token JWT
  public static async getUserByToken(req: Request, res: Response) {
    try {
      // Récupérer le token depuis l'en-tête Authorization
      const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
      if (!JWT_SECRET) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }

      // Vérifier et décoder le token (assurez-vous que la clé secrète est correcte)
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Vérifier si l'ID de l'utilisateur existe dans le token
      if (decoded && decoded.userId) {
        const userId = decoded.userId;

        // Utiliser l'ID utilisateur décodé pour retrouver l'utilisateur dans la base de données
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        // Si l'utilisateur n'est pas trouvé
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Retourner les informations de l'utilisateur
        return res.status(200).json(user);
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
