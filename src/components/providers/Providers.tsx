import React, { ProviderProps } from "react";
import { Routes } from "../../navigation/Routes";
import { AuthProvider } from "./AuthProvider";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
