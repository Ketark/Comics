import { createContext, useState } from "react";
import { ContextValue } from "../types";

export const Context = createContext<ContextValue>({
  user: localStorage.getItem("login"),
  setUser: () => {},
  active: false,
  setActive: () => {},
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("login")
  );

  const [active, setActive] = useState<boolean>(false);

  const contextValue = {
    user,
    setUser,
    active,
    setActive,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
