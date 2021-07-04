import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const CREATE_COFFEE_SHOP = gql`
  mutation CREATE_COFFEE_SHOP(
    $id: Int
    $name: String!
    $file: Upload
    $categories: String
    $longitude: String
    $latitude: String
  ) {
    CreateCoffeeShop(
      id: $id
      name: $name
      file: $file
      categories: $categories
      longitude: $longitude
      latitude: $latitude
    ) {
      CoffeeShop {
        name
        id
        ShopPhotourl
        categories {
          name
        }
      }
    }
  }
`;
const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  border-radius: 100px;
  padding: 10px 20px;
  margin-top: 10px;
`;

const HeaderRightText = styled.Text`
  color: white;
  font-size: 18px;
  bottom: 5px;
  right: 0px;
`;

export default function UploadForm({ route, navigation }) {
  const updateUploadPhoto = (cache, result) => {
    navigation.navigate("Tabs");
  };

  const [uploadPhotoMutation, { loading }] = useMutation(CREATE_COFFEE_SHOP, {
    update: updateUploadPhoto,
  });

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("shopname");
    register("latitude");
    register("longitude");
    register("categories");
  }, [register]);

  const HeaderRight = () => {
    return (
      <TouchableOpacity onPress={handleSubmit(onValid)}>
        <HeaderRightText>Next</HeaderRightText>
      </TouchableOpacity>
    );
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      colors="white"
      style={{ marginRight: 10 }}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ categories, shopname, latitude, longitude }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: "1.jpeg",
      type: "image/jpeg",
    });

    uploadPhotoMutation({
      variables: {
        name: shopname,
        id: 1,
        categories,
        latitude,
        longitude,

        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="name of the shop"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={(text) => setValue("shopname", text)}
          />
          <Caption
            placeholder="Latitude"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={(text) => setValue("latitude", text)}
          />
          <Caption
            placeholder="Longitude"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onChangeText={(text) => setValue("longitude", text)}
          />

          <Caption
            returnKeyType="done"
            placeholder="Category of the shop"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("categories", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
