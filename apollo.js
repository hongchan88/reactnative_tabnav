import React from "react";
import {
  ApolloClient,
  concat,
  createHttpLink,
  empty,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ImageComponent } from "react-native";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const currentId = makeVar(null);

const TOKEN = "token";
export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, JSON.stringify(token));
  isLoggedInVar(true);
  tokenVar(token);
  const userId = jwt_decode(token).id;
  currentId(userId);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
  currentId(null);
};

const httplink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const uploadhttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQl error", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadhttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeCoffeeShops: {
            keyArgs: false,

            merge(existing, incoming) {
              if (!existing) {
                return incoming;
              }
              console.log("existing", existing);

              return {
                CoffeeShop: [...existing.CoffeeShop, ...incoming.CoffeeShop],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
