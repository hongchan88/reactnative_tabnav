import React from "react";
import styled from "styled-components/native"
import { Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";

const Container = styled.View`
flex:1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Image`
max-width: 20%;
height :500px;
align-self: center;



`


export default function AuthLayout({ children }) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();

    }


    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
            <Container>
                <KeyboardAvoidingView style={{ width: "100%" }}

                    behavior="position"
                    keyboardVerticalOffset={100}>

                    <Logo resizeMode="contain" source={require("../../assets/logo.jpg")} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </TouchableWithoutFeedback>
    );


}
