import React from "react";
import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";


export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const currentId = makeVar(null);


const TOKEN = "token";
export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, JSON.stringify(token));
    isLoggedInVar(true);
    tokenVar(token);
    const userId = jwt_decode(token).id
    currentId(userId);

};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
    currentId(null);
};
const client = new ApolloClient({

    uri: "https://instaclon-nomad-challenge.herokuapp.com/graphql",
    cache: new InMemoryCache(),

})

export default client;