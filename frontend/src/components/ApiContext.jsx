import { useMemo } from "react";
import { createContext, useContext } from "react";
import { RecipeApi } from "./api";

const ApiContext = createContext(undefined);

export const useApiContext = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const api = useMemo(() => {
    return new RecipeApi();
  }, []);

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};
 