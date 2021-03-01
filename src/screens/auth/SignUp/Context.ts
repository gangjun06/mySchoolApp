import { createContext } from "react";

export const SignUpContext = createContext<{
  currentpage: string;
  profileCode: string;
  phoneCode: string;
  name: string;
  password: string;
  setName: (str: string) => void;
  setPage: (page: string) => void;
  setProfileCode: (str: string) => void;
  setPhoneCode: (str: string) => void;
  setPassword: (str: string) => void;
}>({
  currentpage: "",
  profileCode: "",
  phoneCode: "",
  name: "",
  password: "",
  setName: () => {},
  setPage: () => {},
  setProfileCode: () => {},
  setPhoneCode: () => {},
  setPassword: () => {},
});
