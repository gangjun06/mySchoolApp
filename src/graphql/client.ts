import ApolloClient from "apollo-boost";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apolloClient = new ApolloClient({
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
