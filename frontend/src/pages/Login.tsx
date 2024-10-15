import React from "react";
import AppInputText from "../components/AppInputText";
//@ts-ignore.
import bgImage from "@/assets/fafiala_background_image_02.jpg";

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // Do something with the form data here
  };

  return (
    <div className="h-screen flex flex-col w-screen justify-center items-center bg-gradient-to-t from-gradient-start to-gradient-end">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 h-2/3 w-3/4 p-2 shadow-md text-slate-800"
        onSubmit={handleSubmit}
      >
        {/* Formulaire */}
        <div className="flex justify-center flex-col gap-4 px-7">
          <p className="text-2xl text-left">Login</p>
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
            className="bg-slate-800 text-slate-50 font-bold py-2 px-4 rounded"
            type="submit"
          >
            Se connecter
          </button>
        </div>

        {/* Image */}
        <img
          className="w-full h-full object-cover md:col-span-1"
          src={bgImage}
          alt="Background"
        />
      </form>
    </div>
  );
};

export default Login;
