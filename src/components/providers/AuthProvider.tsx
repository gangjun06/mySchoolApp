import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole, UserStatus } from "../../models/User";
import { Block, Loading } from "../basic";

export const AuthContext = React.createContext<{
  user: User | null;
  header: any;
  login: (token: string) => Promise<void>;
  logout: () => void;
}>({
  user: {
    name: "",
    role: UserRole.student,
    status: UserStatus.wait,
  },
  header: {},
  login: async (token: string) => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [header, setHeader] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        header,
        login: async (token: string) => {
          const dummy: User = {
            name: "이강준",
            role: UserRole.student,
            status: UserStatus.normal,
            nickname: "",
          };
          setUser(dummy);
          setHeader({
            Authorization: `Bearer ${token}`,
          });
          AsyncStorage.setItem("user", token);
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
