import React from "react";
import { LoadingConctextInterface } from "../interfaces/LoadingConctextInterface";

const LoadingContext = React.createContext<
  LoadingConctextInterface | undefined
>(undefined);

export default LoadingContext;
