import { UserInterface } from "../interfaces/userInterface";

class RoleChecker {
  public static hasRole(user: UserInterface, roleName: string): boolean {
    return user.roles.some(
      (role) => role.name.toLowerCase() === roleName.toLowerCase()
    );
  }
  public static getUserRolesLength(user: UserInterface): number {
    return user.roles.length;
  }
}

export default RoleChecker;
