import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";

import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_COFFEE_SHOPS = gql`
  query SEARCH_COFFEE_SHOPS($keyword: String!) {
    searchCoffeeShop(keyword: $keyword) {
      name
      ShopPhotourl
      id
      user {
        username
      }
      categories {
        name
      }
    }
  }
`;
const SearchingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const SearchingText = styled.Text`
  margin-top: 10px;
  color: white;
  font-weight: 600;
`;
const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  width: ${(props) => props.width / 1.5};
  padding: 5px 10px;
  border-radius: 6px;
`;

const CategoryText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery(SEARCH_COFFEE_SHOPS);
  const onValid = (data) => {
    startQueryFn({
      variables: {
        keyword: data.keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search by Category name"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity>
          <Image
            source={{ uri: item.ShopPhotourl }}
            style={{ width: width / numColumns, height: 150 }}
          />
          <CategoryText>#{item.categories[0].name}</CategoryText>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <SearchingContainer>
            <ActivityIndicator size="large" />
            <SearchingText>Searching...</SearchingText>
          </SearchingContainer>
        ) : null}
        {!called ? (
          <SearchingContainer>
            <SearchingText>search by Category name</SearchingText>
          </SearchingContainer>
        ) : null}
        {data?.searchCoffeeShop !== undefined ? (
          data?.searchCoffeeShop.length == 0 ? (
            <SearchingContainer>
              <SearchingText>could not find anything</SearchingText>
            </SearchingContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShop}
              keyExtractor={(item) => "" + item.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
