import { createContext, useState } from "react";
import { ContextValue } from "../types";

export const Context = createContext<ContextValue>({
  user: localStorage.getItem("login"),
  setUser: () => {},
  active: false,
  setActive: () => {},
  userList: "[]",
  setUserList: () => {},
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("login")
  );

  const [active, setActive] = useState<boolean>(false);

  const [userList, setUserList] = useState<string>(
    localStorage.getItem("userList") || "[]"
  );

  const contextValue = {
    user,
    setUser,
    active,
    setActive,
    userList,
    setUserList,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
