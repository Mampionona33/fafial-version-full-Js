import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Interface pour typer la requête avec l'utilisateur
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour vérifier le token
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Assurez-vous que le type de retour est void
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
    return; // Assurez-vous de ne pas retourner une valeur
  }

  if (!JWT_SECRET) {
    res.status(500).json({
      error: "Erreur de configuration du serveur (clé JWT manquante)",
    });
    return; // Assurez-vous de ne pas retourner une valeur
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Token invalide ou expiré." });
      return;
    }

    (req as AuthenticatedRequest).user = decoded; // Type assertion pour utiliser AuthenticatedRequest
    next(); // Passe au middleware suivant
  });
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: "Accès refusé. Token manquant." });
    return; // Assurez-vous de ne pas retourner une valeur
  }

  next(); // Passe au middleware suivant
};
