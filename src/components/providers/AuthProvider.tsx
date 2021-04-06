import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole, UserStatus } from "../../models/User";
import { Block, Loading } from "../basic";
import { GetMyProfileRes, GET_MY_PROFILE } from "../../graphql/queries";
import { useLazyQuery, useQuery } from "react-apollo";
import { apolloClient } from "../../graphql/client";

export const AuthContext = React.createContext<{
  user: User;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  loading: boolean;
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
  loading: true,
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: "" });
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        loading,
        setUser: (user: User) => {
          setUser(user);
        },
        login: async (token: string) => {
          AsyncStorage.setItem("user", token);

          try {
            const res = await apolloClient.query({
              query: GET_MY_PROFILE,
              fetchPolicy: "no-cache",
            });
            setUser(res.data.myProfile);
            setIsAuth(true);
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
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
