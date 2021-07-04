import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { acc } from "react-native-reanimated";
import { render } from "react-dom";
import { set } from "react-hook-form";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const Top = styled.Text`
  flex: 1;
`;
const Bottom = styled.Text`
  flex: 1;
`;
const HeaderRightText = styled.Text`
  color: white;
  font-size: 18px;
  bottom: 5px;
  right: 0px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };
  console.log(chosenPhoto);
  const HeaderRight = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UploadForm", {
            file: chosenPhoto,
          })
        }
      >
        <HeaderRightText>Upload</HeaderRightText>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => {
    return (
      <ImageContainer onPress={() => choosePhoto(photo.uri)}>
        <Image
          source={{ uri: photo.uri }}
          style={{ width: width / numColumns, height: 100 }}
        />
        <IconContainer>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={photo.uri === chosenPhoto ? "blue" : "white"}
          />
        </IconContainer>
      </ImageContainer>
    );
  };

  return (
    <Container>
      <StatusBar />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
