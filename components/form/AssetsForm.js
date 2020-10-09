import React, { useReducer, useCallback, useRef, useState } from "react";
import { AssetsSelector } from "expo-images-picker";
import { Ionicons } from "@expo/vector-icons";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import AssetUtils from "expo-asset-utils";

const AssetsForm = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);

  const setPhotos =  (photos) => {
    const uris = [];
    AssetUtils.resolveAsync("https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg").then(asset => console.log(asset));
   /* for (let i = 0; i < photos.length; i++) {
      const asset = await AssetUtils.resolveAsync(photos[i].uri);

      console.log(asset);
      uris.push(asset);
    }*/

   //console.log(asset);
   navigation.navigate("HighlineForm", { photos: photos });
  };
  return (
    <React.Fragment>
      <Layout style={styles.margin}></Layout>
      <AssetsSelector
        options={{
          assetsType: ["photo"],
          noAssetsText: "",
          maxSelections: 5,
          margin: 3,
          portraitCols: 4,
          landscapeCols: 5,
          widgetWidth: 100,
          widgetBgColor: styles.container.backgroundColor,
          selectedBgColor: "#ccdfe",
          videoIcon: {
            Component: Ionicons,
            iconName: "ios-videocam",
            color: "white",
            size: 20,
          },
          selectedIcon: {
            Component: Ionicons,
            iconName: "ios-checkmark-circle-outline",
            color: "#fff",
            size: 22,
          },
          defaultTopNavigator: {
            continueText: "Finish",
            goBackText: "Back",
            buttonBgColor: styles.container.button,
            // buttonTextColor: "#000",
            // midTextColor: "#000",
            backFunction: navigation.goBack,
            doneFunction: (data) => setPhotos(data),
          },
        }}
      />
    </React.Fragment>
  );
};

//#region Styles
const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
    button: "color-primary-500",
    bg: "color-primary-100",
  },
  text: {
    fontFamily: "opensans-regular",
  },
  margin: { paddingTop: 20, backgroundColor: "background-basic-color-1" },
});
//#endregion

export default AssetsForm;
