import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Home from "../screens/Home"
import Search from "../screens/Search"
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import UserDetail from "../screens/UserDetail";
import { Ionicons } from "@expo/vector-icons";


const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return <Tabs.Navigator
        tabBarOptions={{ style: { backgroundColor: "white" }, }}

    >
        <Tabs.Screen name="Home" component={Home}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="home" color={color} size={22} />
                ),
            }}
        />

        {isLoggedIn ? <Tabs.Screen name="Profile" component={UserDetail} options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="person" color={color} size={22} />
            ),
        }}
        />
            : <Tabs.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="person" color={color} size={22} />
                ),
            }}
            />}




        <Tabs.Screen name="Search" component={Search} options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="search" color={color} size={22} />
            ),
        }}
        />
    </Tabs.Navigator >
}