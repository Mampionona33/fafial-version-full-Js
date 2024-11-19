import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react";
import { describe, vi, it, expect, beforeEach } from "vitest";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";

// Composant pour tester l'authentification
const TestingComponent = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <>
      <p>{user?.name}</p>
      <p>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
    </>
  );
};

const LoginButton = () => {
  const { login } = useAuth();
  const hanldeLogin = () => {
    login("exemple@test.com", "123");
  };
  return (
    <button data-testid="loginBtn" onClick={hanldeLogin}>
      login
    </button>
  );
};

// Mocker les hooks et fonctions nécessaires
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

function App() {
  return (
    <AuthProvider>
      <TestingComponent />
      <LoginButton />
    </AuthProvider>
  );
}

describe("AuthProvider", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = vi.fn(); // Réinitialise le mock de navigation avant chaque test
    (useNavigate as any).mockReturnValue(mockNavigate); // Assurez-vous que `useNavigate` est bien mocké
  });

  it("");
});
