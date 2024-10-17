import { createContext } from "react";
import { AuthContextType } from "../../interfaces/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
