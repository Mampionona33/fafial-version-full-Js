import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();
/**
 * Liste des compte avec les mots de passes :
 * - superadmin@example.com : SuperAdmin123!
 * - staf@example.com : StafPassword456$
 * - frontdesk@example.com : FrontDesk789#
 * - adminfrontdesk@example.com : MultiRole000@
 * - stafuser@example.com : StafUser321&
 */

async function main() {
  // Créer des rôles
  const superAdmin = await client.role.create({ data: { name: "superAdmin" } });
  const staf = await client.role.create({ data: { name: "staf" } });
  const frontDesk = await client.role.create({ data: { name: "frontDesk" } });

  // Créer des permissions pour différentes ressources
  await client.permission.createMany({
    data: [
      // Permissions pour différentes ressources par rôle
      { action: "read", resource: "salle", roleId: superAdmin.id },
      { action: "write", resource: "salle", roleId: superAdmin.id },
      { action: "read", resource: "salle", roleId: staf.id },
      { action: "write", resource: "salle", roleId: staf.id },
      { action: "read", resource: "salle", roleId: frontDesk.id },
      // Permissions pour users par rôle
      { action: "read", resource: "user", roleId: superAdmin.id },
      { action: "write", resource: "user", roleId: superAdmin.id },
      { action: "read", resource: "user", roleId: staf.id },
      { action: "write", resource: "user", roleId: staf.id },
      { action: "read", resource: "user", roleId: frontDesk.id },
      { action: "write", resource: "user", roleId: frontDesk.id },
      // permissions pour reservation par rôle
      { action: "read", resource: "reservation", roleId: superAdmin.id },
      { action: "write", resource: "reservation", roleId: superAdmin.id },
      { action: "read", resource: "reservation", roleId: staf.id },
      { action: "write", resource: "reservation", roleId: staf.id },
      { action: "read", resource: "reservation", roleId: frontDesk.id },
      { action: "write", resource: "reservation", roleId: frontDesk.id },
      // permissions pour role par rôle
      { action: "read", resource: "role", roleId: superAdmin.id },
      { action: "write", resource: "role", roleId: superAdmin.id },
      { action: "read", resource: "role", roleId: staf.id },
      { action: "write", resource: "role", roleId: staf.id },
      { action: "read", resource: "role", roleId: frontDesk.id },
      //  permissions pour permission par rôle
      { action: "read", resource: "permission", roleId: superAdmin.id },
      { action: "write", resource: "permission", roleId: superAdmin.id },
      { action: "read", resource: "permission", roleId: staf.id },
      { action: "write", resource: "permission", roleId: staf.id },
      { action: "read", resource: "permission", roleId: frontDesk.id },
      // permissions pour depense par rôle
      { action: "read", resource: "depense", roleId: superAdmin.id },
      { action: "write", resource: "depense", roleId: superAdmin.id },
      { action: "read", resource: "depense", roleId: staf.id },
      { action: "write", resource: "depense", roleId: staf.id },
      // permissions pour paiement par rôle
      { action: "read", resource: "paiement", roleId: superAdmin.id },
      { action: "write", resource: "paiement", roleId: superAdmin.id },
      { action: "read", resource: "paiement", roleId: staf.id },
      { action: "write", resource: "paiement", roleId: staf.id }
    ]
  });

  // Créer des utilisateurs avec des mots de passe sécurisés
  const hashedSuperAdminPassword = await bcrypt.hash("SuperAdmin123!", 10);
  const hashedStafPassword = await bcrypt.hash("StafPassword456$", 10);
  const hashedFrontDeskPassword = await bcrypt.hash("FrontDesk789#", 10);
  const hashedMultiRolePassword = await bcrypt.hash("MultiRole000@", 10);
  const hashedUserPassword = await bcrypt.hash("StafUser321&", 10);

  // créer les salles
  await client.salle.create({
    data: {
      nom: "Salle 01",
      capacite: 100,
      montantLoyer: 50000
    }
  });

  // Créer chaque utilisateur avec un rôle et un mot de passe unique
  await client.user.create({
    data: {
      email: "superadmin@example.com",
      password: hashedSuperAdminPassword,
      name: "Super",
      lastName: "Admin",
      roles: { connect: { id: superAdmin.id } } // Association avec le rôle superAdmin
    }
  });

  await client.user.create({
    data: {
      email: "staf@example.com",
      password: hashedStafPassword,
      name: "John",
      lastName: "Staf",
      roles: { connect: { id: staf.id } } // Association avec le rôle staf
    }
  });

  await client.user.create({
    data: {
      email: "frontdesk@example.com",
      password: hashedFrontDeskPassword,
      name: "Anna",
      lastName: "FrontDesk",
      roles: { connect: { id: frontDesk.id } } // Association avec le rôle frontDesk
    }
  });

  // Utilisateur avec plusieurs rôles (superAdmin et frontDesk)
  await client.user.create({
    data: {
      email: "adminfrontdesk@example.com",
      password: hashedMultiRolePassword,
      name: "Alex",
      lastName: "AdminFrontDesk",
      roles: {
        connect: [
          { id: superAdmin.id }, // Rôle SuperAdmin
          { id: frontDesk.id } // Rôle FrontDesk
        ]
      }
    }
  });

  // Utilisateur avec plusieurs rôles (staf et frontDesk)
  await client.user.create({
    data: {
      email: "stafuser@example.com",
      password: hashedUserPassword,
      name: "Sophie",
      lastName: "StafUser",
      roles: {
        connect: [
          { id: staf.id }, // Rôle Staf
          { id: frontDesk.id } // Rôle FrontDesk
        ]
      }
    }
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
