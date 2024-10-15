import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Ajout pour sécuriser les mots de passe

const prisma = new PrismaClient();

async function main() {
  // Créer des rôles
  const adminRole = await prisma.role.create({ data: { name: "admin" } });
  const editorRole = await prisma.role.create({ data: { name: "editor" } });
  const viewerRole = await prisma.role.create({ data: { name: "viewer" } });

  // Créer des permissions pour différentes ressources
  await prisma.permission.createMany({
    data: [
      // Permissions pour User
      { action: "read", resource: "User", roleId: adminRole.id },
      { action: "write", resource: "User", roleId: adminRole.id },
      { action: "delete", resource: "User", roleId: adminRole.id },

      // Permissions pour Post
      { action: "read", resource: "Post", roleId: editorRole.id },
      { action: "write", resource: "Post", roleId: editorRole.id },

      // Permissions pour viewer (lecture seulement)
      { action: "read", resource: "Post", roleId: viewerRole.id },
    ],
  });

  // Créer des utilisateurs avec des mots de passe sécurisés
  const hashedAdminPassword = await bcrypt.hash("adminpassword", 10);
  const hashedEditorPassword = await bcrypt.hash("editorpassword", 10);
  const hashedViewerPassword = await bcrypt.hash("viewerpassword", 10);

  // Créer chaque utilisateur avec un rôle
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedAdminPassword,
      roles: { connect: { id: adminRole.id } }, // Association avec le rôle admin
    },
  });

  await prisma.user.create({
    data: {
      email: "editor@example.com",
      password: hashedEditorPassword,
      roles: { connect: { id: editorRole.id } }, // Association avec le rôle editor
    },
  });

  await prisma.user.create({
    data: {
      email: "viewer@example.com",
      password: hashedViewerPassword,
      roles: { connect: { id: viewerRole.id } }, // Association avec le rôle viewer
    },
  });

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // @ts-ignore
    process.exit(1);
  });
