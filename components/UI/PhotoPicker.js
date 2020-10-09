import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Card,
} from "@ui-kitten/components";

const PhotoPicker = (props) => {
  const styles = useStyleSheet(themedStyles);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <Card onPress={openImagePickerAsync} style={styles.container}>
      <Image
        source={{
          uri:
            selectedImage !== null
              ? selectedImage.localUri
              : "https://icsb.org/wp-content/uploads/2018/10/a5f6dcb2cb8b7630dc5ecdaeecd6a2de.png",
        }}
        style={styles.img}
      />
    </Card>
  );
};
//#region Styles
const themedStyles = StyleService.create({
  container: {
    width: 180,
    height: 150,
    borderRadius: 8,
    marginHorizontal: 8,

    alignItems: "center",
    //position:"absolute"
  },
  text: {
    fontFamily: "opensans-regular",
  },
  img: {
    flex: 1,
    width: 180,
    height: 150,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: -15,
  },
});
//#endregion

export default PhotoPicker;
