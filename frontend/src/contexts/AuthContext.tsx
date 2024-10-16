import { createContext } from "react";
import { LoginData } from "../services/AuthServices";

// frontend/src/contexts/AuthContext.tsx
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: number; data: LoginData } | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
