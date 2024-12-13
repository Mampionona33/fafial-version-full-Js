import { UserInterface } from "./userInterface";
import { LoginData } from "./LoginDataInterface";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInterface | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: number; data: LoginData } | undefined>;
  logout: () => void;
}
