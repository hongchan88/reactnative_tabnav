import React from "react";
import styled from "styled-components/native"

export const TextInput = styled.TextInput`
background-color: rgba(255, 255,255,0.15);
padding: 15px 7px;

border-radius: 4px;
color:white;
width: 100%;
margin-bottom: ${(props) => (props.lastOne ? "10" : "8")}px;



`;