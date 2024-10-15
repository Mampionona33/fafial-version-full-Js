import React from "react";
import AppInputText from "../components/AppInputText";

const Login = () => {
  return (
    <div className="h-screen flex flex-col w-screen justify-center items-center bg-gradient-to-t from-gradient-start to-gradient-end">
      <form className="flex flex-col gap-4 bg-slate-200 h-2/3 w-1/3 p-4 shadow-md text-slate-800">
        <p className="text-2xl text-center">Login</p>
        <AppInputText
          label="Email"
          id="email"
          type="email"
          mainClassName="text-salate-800"
          placeholder="Entrez votre email"
          inputClassName="w-full"
          errorMessage="test"
        />

        <AppInputText label="Mot de passe" type="password" id="password" />
      </form>
    </div>
  );
};

export default Login;
