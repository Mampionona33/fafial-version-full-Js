import React from "react";
import AppInputText from "../components/AppInput";
import bgImage from "../assets/fafiala_background_image_02.jpg";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import AppLabel from "../components/AppLabel";
import IndeterminateProgressBar from "../components/IndeterminateProgressBar";
import { PrimeReactProvider } from "primereact/api";

const Login = () => {
  const { login, loading } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const resp = await login(email, password);
      if (resp?.status === 401) {
        toast.error(resp.data.message);
        form.reset();
      }

      if (resp?.status === 200) {
        toast.success("Connexion reussie.", {
          position: "bottom-right",
          toastId: "login-toast",
        });
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Login failed. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <PrimeReactProvider>
      {loading && <IndeterminateProgressBar />}
      <div className="h-screen flex flex-col justify-center px-16 md:px-4 items-center bg-gradient-to-t from-gradient-start to-gradient-end">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 sm:h-auto min-h-[60vh] w-11/12 md:w-2/4 p-4 shadow-md text-slate-800"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center flex-col gap-4 px-7">
            <p className="text-2xl md:text-3xl text-left font-bold">Login</p>

            <div className="flex flex-col gap-3">
              <div>
                <AppLabel htmlFor="email">Email</AppLabel>
                <AppInputText
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Entrer votre email"
                  autoComplete="email"
                />
              </div>
              <div>
                <AppLabel htmlFor="password">Mot de passe</AppLabel>
                <AppInputText
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Entrer votre mot de passe"
                />
              </div>
            </div>

            <button
              className="bg-slate-800 text-slate-50 font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Se connecter
            </button>
          </div>
          <div className="hidden md:flex md:col-span-1 sm:hidden w-full h-full justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-tr-md rounded-br-md"
              src={bgImage}
              alt="Background"
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </PrimeReactProvider>
  );
};

export default Login;
