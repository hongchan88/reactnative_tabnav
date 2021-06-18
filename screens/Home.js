import React from "react"
import { View, Text } from "react-native"
import AuthLayout from "../components/auth/AuthLayout"
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native"

const GET_COFFEESHOPS = gql`
  query GET_COFFEESHOPS($page: Int) {
    seeCoffeeShops(page: $page) {
      ok
      CoffeeShop {
        name
        longitude
        id
      }
    }
  }
`;


const TextList = styled.Text`
color: black;
`;
export default function Home() {
  const { data, loading } = useQuery(GET_COFFEESHOPS, {
    variables: { page: 1 },
  });



  const shopname = !loading ? data.seeCoffeeShops.CoffeeShop.map(({ name, id }) => {
    return <Text key={id} style={{ color: "white" }}>{name}</Text>
  }) : <Text style={{ color: "white" }}> loading.. </Text>




  return <View style={{
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }}>
    <Text style={{ color: "white" }}>
      List of all shop names
    </Text>
    {shopname}

  </View>

}