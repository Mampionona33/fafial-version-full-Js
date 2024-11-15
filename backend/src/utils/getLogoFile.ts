import fs from "fs";
import path from "path";

// Fonction pour récupérer le logo dans le dossier spécifié
const getLogoFile = (logoFolderName: string): string | null => {
  // Accéder à la racine du projet en remontant deux niveaux depuis "src/utils"
  const logoFolderPath = path.resolve(
    __dirname,
    "../uploads/logos", // Assurez-vous que ce chemin est correct
    logoFolderName
  );

  console.log("Chemin calculé pour le dossier des logos:", logoFolderPath);

  // Vérification de l'existence du dossier
  if (!fs.existsSync(logoFolderPath)) {
    console.error(`Le dossier ${logoFolderPath} n'existe pas.`);
    return null;
  }

  // Afficher les fichiers présents dans le dossier pour débogage
  const filesInDirectory = fs.readdirSync(logoFolderPath);
  console.log("Fichiers dans le dossier:", filesInDirectory);

  // Recherche des fichiers SVG, PNG et JPG dans ce dossier
  const svgFiles = filesInDirectory.filter((file) =>
    file.toLowerCase().endsWith(".svg")
  );
  const pngFiles = filesInDirectory.filter((file) =>
    file.toLowerCase().endsWith(".png")
  );
  const jpgFiles = filesInDirectory.filter(
    (file) =>
      file.toLowerCase().endsWith(".jpg") ||
      file.toLowerCase().endsWith(".jpeg")
  );

  console.log("Fichiers SVG trouvés:", svgFiles);
  console.log("Fichiers PNG trouvés:", pngFiles);
  console.log("Fichiers JPG trouvés:", jpgFiles);

  // Prioriser les fichiers dans cet ordre : SVG, PNG, JPG
  if (svgFiles.length > 0) {
    return path.join(logoFolderPath, svgFiles[0]); // Retourner le premier fichier SVG trouvé
  }
  if (pngFiles.length > 0) {
    return path.join(logoFolderPath, pngFiles[0]); // Retourner le premier fichier PNG trouvé
  }
  if (jpgFiles.length > 0) {
    return path.join(logoFolderPath, jpgFiles[0]); // Retourner le premier fichier JPG trouvé
  }

  console.log("Aucun fichier logo trouvé.");
  return null; // Aucun fichier trouvé
};

export default getLogoFile;
