import React from "react";
import { Routes } from "../../navigation/Routes";
import { AuthProvider } from "./AuthProvider";

import { ApolloProvider } from "react-apollo";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { apolloClient } from "../../graphql/client";

interface ProvidersProps {}
export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <BottomSheetModalProvider>
          <Routes />
        </BottomSheetModalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
