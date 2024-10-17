import { UserInterface } from "./userInterface";
import { LoginData } from "./LoginDataInterface";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInterface | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: number; data: LoginData } | undefined>;
  logout: () => void;
}
