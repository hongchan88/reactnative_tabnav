import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import UserDetail from "../screens/UserDetail";
import { Ionicons } from "@expo/vector-icons";
import StackNavFactory from "./StackNavFactory";

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tabs.Navigator tabBarOptions={{ style: { backgroundColor: "white" } }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={22} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>

      {isLoggedIn ? (
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="person" color={color} size={22} />
            ),
          }}
        >
          {() => <StackNavFactory screenName="UserDetail" />}
        </Tabs.Screen>
      ) : (
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name="person" color={color} size={22} />
            ),
          }}
        >
          {() => <StackNavFactory screenName="Profile" />}
        </Tabs.Screen>
      )}

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={22} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
