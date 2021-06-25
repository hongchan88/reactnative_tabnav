import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";

import Search from "../screens/Search";
import Home from "../screens/Home";
import UserDetail from "../screens/UserDetail";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  console.log(screenName);
  return (
    <Stack.Navigator>
      {screenName === "Home" ? (
        <Stack.Screen name={"Home"} component={Home} />
      ) : null}

      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}

      {screenName === "Profile" ? (
        <Stack.Screen name={"Profile"} component={Profile} />
      ) : null}
      {screenName === "UserDetail" ? (
        <Stack.Screen name={"UserDetail"} component={UserDetail} />
      ) : null}
    </Stack.Navigator>
  );
}
