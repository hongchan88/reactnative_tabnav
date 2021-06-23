import React from "react";
import { ActivityIndicator, View, Text } from "react-native";




export default function ScreenLayout({ loading, children }) {
    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>

            <Text style={{ color: "white" }}>list of names</Text>



            {loading ? <ActivityIndicator color="white" /> : children}

        </View>
    )
}