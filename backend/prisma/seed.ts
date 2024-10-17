import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

async function main() {
  // Créer des rôles
  const superAdmin = await client.role.create({ data: { name: "superadmin" } });
  const responsable = await client.role.create({
    data: { name: "responsable" },
  });
  const accueil = await client.role.create({ data: { name: "accueil" } });
  const manager = await client.role.create({ data: { name: "manager" } });
  const user = await client.role.create({ data: { name: "user" } });

  // Créer des permissions pour différentes ressources
  await client.permission.createMany({
    data: [
      // Permissions pour Salle
      { action: "read", resource: "Salle", roleId: superAdmin.id },
      { action: "write", resource: "Salle", roleId: superAdmin.id },
      { action: "delete", resource: "Salle", roleId: superAdmin.id },

      { action: "read", resource: "Salle", roleId: responsable.id },
      { action: "write", resource: "Salle", roleId: responsable.id },

      { action: "read", resource: "Salle", roleId: accueil.id },

      { action: "read", resource: "Salle", roleId: manager.id },
      { action: "write", resource: "Salle", roleId: manager.id },

      { action: "read", resource: "Salle", roleId: user.id },
    ],
  });

  // Créer des utilisateurs avec des mots de passe sécurisés
  const hashedSuperAdminPassword = await bcrypt.hash("superAdminPassword", 10);
  const hashedResponsablePassword = await bcrypt.hash(
    "responsablePassword",
    10
  );
  const hashedAccueilPassword = await bcrypt.hash("accueilPassword", 10);
  const hashedManagerPassword = await bcrypt.hash("managerPassword", 10);
  const hashedUserPassword = await bcrypt.hash("userPassword", 10);

  // Créer chaque utilisateur avec un rôle
  await client.user.create({
    data: {
      email: "superadmin@example.com",
      password: hashedSuperAdminPassword,
      name: "Super",
      lastName: "Admin",
      roles: { connect: { id: superAdmin.id } }, // Association avec le rôle superAdmin
    },
  });

  await client.user.create({
    data: {
      email: "responsable@example.com",
      password: hashedResponsablePassword,
      name: "Jean",
      lastName: "Responsable",
      roles: { connect: { id: responsable.id } }, // Association avec le rôle responsable
    },
  });

  await client.user.create({
    data: {
      email: "accueil@example.com",
      password: hashedAccueilPassword,
      name: "Marie",
      lastName: "Accueil",
      roles: { connect: { id: accueil.id } }, // Association avec le rôle accueil
    },
  });

  // Utilisateur avec plusieurs rôles (manager et responsable)
  await client.user.create({
    data: {
      email: "manager@example.com",
      password: hashedManagerPassword,
      name: "Paul",
      lastName: "Manager",
      roles: {
        connect: [
          { id: manager.id }, // Rôle Manager
          { id: responsable.id }, // Rôle Responsable
        ],
      },
    },
  });

  // Utilisateur avec plusieurs rôles (user et accueil)
  await client.user.create({
    data: {
      email: "user@example.com",
      password: hashedUserPassword,
      name: "Sophie",
      lastName: "User",
      roles: {
        connect: [
          { id: user.id }, // Rôle User
          { id: accueil.id }, // Rôle Accueil
        ],
      },
    },
  });

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    // @ts-ignore
    process.exit(1);
  });
