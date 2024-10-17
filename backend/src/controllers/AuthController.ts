import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  // Méthode statique de connexion
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // Recherche de l'utilisateur dans la base de données par email
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401).json({
          message: "Email ou mot de passe incorrect",
        });
        return;
      }

      // Comparer le mot de passe avec celui stocké en base
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(401).json({
          message: "Email ou mot de passe incorrect",
        });
        return;
      }

      if (!JWT_SECRET) {
        throw new Error(
          "La clé secrète JWT n'est pas définie dans les variables d'environnement."
        );
      }

      // Si la connexion est réussie, générer un token JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h", // On peut ajuster la durée d'expiration
      });

      // Retourner le token
      res.json({ token, message: "Connexion réussie" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }

  // Méthode pour récupérer l'utilisateur à partir du token JWT
  public static async getUserByToken(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Récupérer le token depuis l'en-tête Authorization
      const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

      if (!token) {
        res.status(401).json({ message: "Le token est manquant" });
        return;
      }

      if (!JWT_SECRET) {
        throw new Error(
          "La clé secrète JWT n'est pas définie dans les variables d'environnement."
        );
      }

      // Vérifier et décoder le token
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      if (!decoded || !decoded.userId) {
        res.status(401).json({ message: "Token invalide" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }

      // Retourner les informations de l'utilisateur
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
}

export default AuthController;
