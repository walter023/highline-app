import React, { useState, useEffect } from "react";
import {
  Input,
  StyleService,
  useStyleSheet,
  TopNavigationAction,
  Layout,
} from "@ui-kitten/components";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { ScrollView, View } from "react-native";
import LocationItem from "./locationItem";
import { BackIcon, CloseIcon } from "../UI/appIcon";

const SearchLocation = (props) => {
  const styles = useStyleSheet(themedStyles);
  const focus = React.useRef();
  
  useEffect(() => {
    focus.current.focus();
  }, []);

  const navigateBack = () => {
    props.navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const closeAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={navigateBack} />
  );

  return (
    <Layout style={styles.container}>
      <GoogleAutoComplete
        apiKey={""}
        debounce={500}
        minLength={3}
        queryTypes="(cities)"
      >
        {({ handleTextChange, locationResults, fetchDetails }) => (
          <View style={styles.iconContainer}>
            <Input
              autoCorrect={false}
              focusable={true}
              placeholder="Map Search"
              ref={focus}
              accessoryLeft={BackAction}
              accessoryRight={closeAction}
              status="basic"
              size="large"
              style={styles.input}
              textStyle={styles.text}
              onChangeText={handleTextChange}
            />

            <ScrollView>
              {locationResults.map((el) => (
                <LocationItem
                  {...el}
                  key={Math.random()}
                  fetchDetails={fetchDetails}
                  navigation={props.navigation}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </GoogleAutoComplete>
    </Layout>
  );
};
const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "center",
  },
  input: {
    width: "95%",
    borderColor: "background-basic-color-2",
    backgroundColor: "background-basic-color-2",
  },
  text:{ 
   // fontFamily: "opensans-regular",
    color: "text-hint-color"
  }
});
export default SearchLocation;
