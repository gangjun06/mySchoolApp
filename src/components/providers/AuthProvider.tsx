import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole, UserStatus } from "../../models/User";
import { Block, Loading } from "../basic";

export const AuthContext = React.createContext<{
  user: User;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  isAuth: boolean;
}>({
  user: {
    name: "",
    role: UserRole.student,
    status: UserStatus.wait,
  },
  setUser: (user: User) => {},
  login: async (token: string) => {},
  logout: () => {},
  isAuth: false,
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: "" });
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        setUser: (user: User) => {
          setUser(user);
        },
        login: async (token: string) => {
          setUser({ name: "" });
          AsyncStorage.setItem("user", token);
          setIsAuth(true);
        },
        logout: () => {
          setUser({ name: "" });
          AsyncStorage.removeItem("user");
          setIsAuth(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
