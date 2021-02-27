import React from "react";
import { Routes } from "../../navigation/Routes";
import { AuthProvider } from "./AuthProvider";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://121.181.11.148:8080/query"
      : "https://info.osang.xyz/query",
});

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
};
