import React from "react";
import AppInputText from "../components/AppInputText";
//@ts-ignore
import bgImage from "@/assets/fafiala_background_image_02.jpg";

const Login = () => {
  return (
    <div className="h-screen flex flex-col w-screen justify-center items-center bg-gradient-to-t from-gradient-start to-gradient-end">
      <form className="grid grid-cols-5 gap-4 bg-slate-50 h-2/3 w-3/4 p-4 shadow-md text-slate-800">
        <div className="col-span-2 flex justify-center  flex-col gap-4 px-7">
          <p className="text-2xl text-left">Login</p>
          <AppInputText
            label="Email"
            id="email"
            type="email"
            mainClassName="text-slate-800"
            placeholder="Entrez votre email"
            inputClassName="w-full"
          />
          <AppInputText label="Mot de passe" type="password" id="password" />
          <button
            className="bg-slate-800 text-slate-50 font-bold py-2 px-4 rounded"
            type="submit"
          >
            Se connecter
          </button>
        </div>

        <img
          className="col-span-3 w-full h-full object-cover"
          src={bgImage}
          alt="Background"
        />
      </form>
    </div>
  );
};

export default Login;
