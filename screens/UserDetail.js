import React from "react";
import { View, Text, TouchableOpacity, LogBox } from "react-native";
import { logUserOut, tokenVar, currentId } from "../apollo";

import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query GET_PROFILE($id: Int!) {
    seeProfile(id: $id) {
      email
      location
      name
      totalFollowing
      totalFollowers
      username
    }
  }
`;

export default function UserDetail() {
  // console.log(jwt_decode(tokenVar()))

  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { id: currentId() },
  });

  const { name, email, location, username } = async () => await data.seeProfile;

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Your detail:</Text>
      <Text style={{ color: "white" }}>
        username: {!loading ? username : null}
      </Text>
      <Text style={{ color: "white" }}>name: {!loading ? name : null}</Text>
      <Text style={{ color: "white" }}>email: {!loading ? email : null}</Text>
      <Text style={{ color: "white" }}>
        location: {!loading ? location : null}
      </Text>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
