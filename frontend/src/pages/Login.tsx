import React from "react";
import AppInputText from "../components/AppInputText";
import bgImage from "../assets/fafiala_background_image_02.jpg";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const resp = await login(email, password);
      console.log(resp);
      if (!resp) {
        throw new Error("Login failed. Please try again.");
      }
      if (resp.status === 200) {
        toast.success("Login successful!");
      }

      if (resp.status === 401) {
        toast.error("Invalid email or password. Please try again.");
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
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-t from-gradient-start to-gradient-end">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 sm:h-auto min-h-[60vh] w-11/12 md:w-2/4 p-4 shadow-md text-slate-800"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center flex-col gap-4 px-7">
          <p className="text-2xl md:text-3xl text-left font-bold">Login</p>
          <AppInputText
            label="Email"
            id="email"
            name="email"
            required
            type="email"
            mainClassName="text-slate-800"
            placeholder="Entrez votre email"
            inputClassName="w-full"
          />
          <AppInputText
            label="Mot de passe"
            type="password"
            id="password"
            name="password"
            required
          />
          <button
            className="bg-slate-800 text-slate-50 font-bold py-2 px-4 rounded mt-4"
            type="submit"
          >
            Se connecter
          </button>
        </div>
        <div className="hidden md:flex md:col-span-1 sm:hidden w-full h-full justify-center items-center">
          <img
            className="w-full h-full object-cover rounded-md"
            src={bgImage}
            alt="Background"
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
