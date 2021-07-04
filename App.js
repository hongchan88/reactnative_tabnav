import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import { useReactiveVar, ApolloProvider } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackNavFactory from "./navigators/StackNavFactory";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const ImagesToLoad = [require("./assets/logo.jpg")];
    const ImagePromises = ImagesToLoad.map((image) => {
      Asset.loadAsync(image);
    });
    return Promise.all([...fontPromises, ...ImagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        onError={console.warm}
        onFinish={onFinish}
        startAsync={preload}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          <LoggedOutNav />
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
