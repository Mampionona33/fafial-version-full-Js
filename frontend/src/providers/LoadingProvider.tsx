import React from "react";
import LoadingContext from "../contexts/LoadingContext";

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
