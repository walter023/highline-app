import React from "react";
import FadeInView from "../UI/FadeInView";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Card, Text, Icon } from "@ui-kitten/components";

const LocationIcons = (props) => (
  <Icon style={styles.icon} {...props} fill="#8F9BB3" />
);

const PopUpLocation = (props) => {
  const { navigation } = props;
  const isPopup = () => {
    if (props.location.highlines.length > 1) {
      navigation.navigate("Highines", { location: props.location });
    } else {
      navigation.navigate("Highine", {
        locationId: props.location._id,
        highline: props.location.highlines[0],
      });
    }
  };
  return (
    <FadeInView>
      <Card onPress={isPopup}>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <View style={styles.image}>
            <TouchableWithoutFeedback onPress={isPopup}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri:
                    props.location.highlines[
                      Math.floor(
                        Math.random() * props.location.highlines.length
                      )
                    ].imagesUrl[0], // Math.floor(Math.random() * props.location.highlines[0].imagesUrl.length)
                }}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={{ flex: 1.5 }}>
            <Text style={styles.text} category="p1">
              {props.location.name}
            </Text>
            <Text style={styles.text} appearance="hint" category="s2">
              {`${
                Math.round((props.location.dist.calculated / 1000) * 10) / 10
              } km from sydney`}
            </Text>
          </View>
          <View style={styles.iconStyle}>
            <LocationIcons name="star-outline" />
            <Text appearance="hint" category="s2" style={styles.text}>
              {props.location.highlines.length}
            </Text>
          </View>
          <View style={styles.iconStyle}>
            <LocationIcons name="pin-outline" />
            <Text style={styles.text} appearance="hint" category="s2">
              {`${
                Math.round((props.location.dist.calculated / 1000) * 10) / 10
              } km`}
            </Text>
          </View>

          <View style={styles.closeWindow}>
            <TouchableWithoutFeedback onPress={() => props.showPopUp(null)}>
              <LocationIcons name="close-outline" animation="zoom" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Card>
    </FadeInView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "opensans-regular",
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconStyle: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 5,
  },
  closeWindow: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -15,
    marginRight: -20,
    paddingLeft: 5,
  },
  image: { flex: 1, marginBottom: -16, marginLeft: -24, marginTop: -22 },
});
export default PopUpLocation;
