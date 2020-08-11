import React from "react";
import { StyleSheet, LayoutAnimation, View } from "react-native";
import { Layout, Icon } from "@ui-kitten/components";
import Search from "../components/location/search";
import { StatusBar } from "expo-status-bar";
import Location from "../containers/Location";

const Map = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <StatusBar style="dark" />
      <Search />
      <Location navigation={navigation} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Map;
