import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole, UserStatus } from "../../models/User";

export const AuthContext = React.createContext<{
  user: User | null;
  login: () => void;
  logout: () => void;
  profileByToken: (token: string) => void;
}>({
  user: {
    name: "",
    nickname: "",
    role: UserRole.student,
    status: UserStatus.wait,
  },
  login: () => {},
  logout: () => {},
  profileByToken: (token: string) => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const dummy: User = {
            name: "이강준",
            role: UserRole.student,
            status: UserStatus.normal,
            nickname: "",
          };
          setUser(dummy);
          AsyncStorage.setItem("user", "token");
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
        profileByToken: (token: string) => {
          const dummy: User = {
            name: "이강준",
            role: UserRole.student,
            status: UserStatus.normal,
            nickname: "",
          };
          setUser(dummy);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
