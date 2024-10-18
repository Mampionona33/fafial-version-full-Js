import { JWT_SECRET } from "constants/envConstants";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Interface pour typer la requête avec l'utilisateur
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

class AuthMiddleware {
  // Méthode statique pour vérifier le token
  public static authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    // Récupère le token depuis les headers de la requête
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
      return;
    }

    if (!JWT_SECRET) {
      res.status(500).json({
        error: "Erreur de configuration du serveur (clé JWT manquante)",
      });
      return;
    }

    // Vérifie et décode le token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: "Token invalide ou expiré." });
      }

      // Si le token est valide, attache l'utilisateur à l'objet req
      req.user = decoded; // Typiquement, ce serait { userId: string, etc. } en fonction de ce que tu inclus dans ton token JWT

      next(); // Passe à l'étape suivante (le contrôleur)
    });
  }
}

export default AuthMiddleware;
