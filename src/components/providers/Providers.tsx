import React from "react";
import { Routes } from "../../navigation/Routes";
import { AuthProvider } from "./AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://121.181.11.148:8080/query"
      : "https://api.osang.xyz/query",
  request: async (operation) => {
    const token = await AsyncStorage.getItem("user");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BottomSheetModalProvider>
          <Routes />
        </BottomSheetModalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
