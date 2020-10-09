import React from "react";
import { StyleSheet, LayoutAnimation, View } from "react-native";
import { Layout, Icon } from "@ui-kitten/components";
import Search from "../components/UI/Search";
import Location from "../components/location/Location";

const Map = ({ navigation }) => {

  return (
    <Layout style={styles.container}>
      <Search navigation={navigation} />
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
