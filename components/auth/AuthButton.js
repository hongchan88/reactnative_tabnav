import React from "react";
import styled from "styled-components/native"
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";



const Button = styled.TouchableOpacity`
background-color: blue; 
padding: 13px 10px;
  border-radius: 3px;
  width:100%;



`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
 
`;


export default function AuthButton({ onPress, disabled, text, loading }) {

    return (

        <Button disabled={disabled} onPress={onPress}>
            {loading ? (<ActivityIndicator color="white" />) : (<ButtonText>{text}</ButtonText>)}
        </Button>

    );
}