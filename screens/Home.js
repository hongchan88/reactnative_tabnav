import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";

const GET_COFFEESHOPS = gql`
  query GET_COFFEESHOPS($offset: Int) {
    seeCoffeeShops(offset: $offset) {
      CoffeeShop {
        name
        longitude
        id
        ShopPhotourl
        categories {
          name
        }
      }
    }
  }
`;

const TextList = styled.Text`
  color: black;
`;
export default function Home() {
  const { data, loading, refetch, fetchMore } = useQuery(GET_COFFEESHOPS, {
    variables: { offset: 0 },
  });

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const listCat = item.categories.map((cat) => {
      const catNames = `#${cat.name} `;
      return catNames;
    });

    console.log(data?.seeCoffeeShops.CoffeeShop.length);

    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
        <Image
          source={{ uri: item?.ShopPhotourl }}
          style={{ width: 350, height: 300 }}
        />
        <Text style={{ color: "white" }}> Coffe shop name: {item.name} </Text>

        <Text style={{ color: "white" }}> Category: {listCat} </Text>
      </View>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: { offset: data?.seeCoffeeShops.CoffeeShop.length },
          })
        }
        style={{ width: "100%" }}
        data={data?.seeCoffeeShops.CoffeeShop}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="white"
          />
        }
      />
    </ScreenLayout>
  );
}
