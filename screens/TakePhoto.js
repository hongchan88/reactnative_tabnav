import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Action = styled.View`
  flex: 0.3;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ActionContainer = styled.View`
  flex-direction: row;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SliderContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const camera = useRef();
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [FlashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const getPermissions = async () => {
    const permissions = await Camera.requestPermissionsAsync();
    setOk(true);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (FlashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (FlashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (FlashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const onCameraReady = () => {
    setCameraReady(true);
  };
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => {
    setTakenPhoto("");
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", { file: takenPhoto });
    console.log("will upload", takenPhoto);
  };
  const onUpload = () => {
    Alert.alert("Save photo?", "Save photo & Upload or just upload", [
      {
        text: "Save & Upload",
        onPress: () => {
          goToUpload(true);
        },
      },
      {
        text: "Just Upload",
        onPress: () => {
          goToUpload(false);
        },
      },
    ]);
  };
  const isFocused = useIsFocused();
  console.log(isFocused);
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}

      {takenPhoto === "" ? (
        <Camera
          onCameraReady={onCameraReady}
          ref={camera}
          type={cameraType}
          zoom={zoom}
          flashMode={FlashMode}
          style={{
            flex: 1,
          }}
        >
          <CloseBtn onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Action>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomValueChange}
              onFlashChange={onFlashChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionContainer>
              <TouchableOpacity
                onPress={onCameraSwitch}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={onFlashChange}>
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    FlashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : FlashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : FlashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : ""
                  }
                />
              </TouchableOpacity>
            </ActionContainer>
          </ButtonsContainer>
        </Action>
      ) : (
        <Action>
          <PhotoAction>
            <PhotoActionText onPress={onDismiss}>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction>
            <PhotoActionText onPress={onUpload}>Upload</PhotoActionText>
          </PhotoAction>
        </Action>
      )}
    </Container>
  );
}
