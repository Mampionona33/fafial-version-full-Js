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
) => {
  // Récupère le token depuis les headers de la requête
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({
      error: "Erreur de configuration du serveur (clé JWT manquante)",
    });
  }

  // Vérifie et décode le token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré." });
    }

    // Si le token est valide, attache l'utilisateur à l'objet req
    req.user = decoded; // Typiquement, ce serait { userId: string, etc. } en fonction de ce que tu inclus dans ton token JWT

    next(); // Passe à l'étape suivante (le contrôleur)
  });
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Vérifie si l'utilisateur est défini dans la requête
  if (!req.user) {
    res.status(401).json({ error: "Accès refusé. Token manquant." });
    return;
  }

  // Si tout va bien, passez à l'étape suivante
  next();
};
