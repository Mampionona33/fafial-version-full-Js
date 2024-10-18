import { UserInterface } from "../interfaces/userInterface";

class RoleChecker {
  public static hasRole(user: UserInterface, roleName: string): boolean {
    return user.roles.some((role) => role.name === roleName);
  }
}

export default RoleChecker;
