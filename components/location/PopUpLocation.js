import React from "react";
import FadeInView from "../UI/FadeInView";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import {
  Card,
  Text,
  Icon,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { HighlineIcon } from "../UI/AppIcon";

const LocationIcons = (props) => <Icon {...props} fill="#8F9BB3" />;

const PopUpLocation = (props) => {
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
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
        <View style={{ flexDirection: "row" }}>
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

          <View style={styles.tittle}>
            <Text style={styles.text} category="s2">
              {props.location.name}
            </Text>
            <Text style={styles.text} appearance="hint" category="s2">
              {`${
                Math.round((props.location.dist.calculated / 1000) * 10) / 10
              } km`}
            </Text>
          </View>
          <View style={styles.iconStyle}>
            <HighlineIcon
              style={styles.slacklineIcon}
              name="rope"
              fill="#8F9BB3"
            />
            <Text appearance="hint" category="s2" style={styles.text}>
              {props.location.highlines.length +
                (props.location.highlines.length === 1
                  ? " highline"
                  : " highlines")}
            </Text>
          </View>
          <View style={styles.iconStyle}>
            <LocationIcons name="pin-outline" style={styles.icon} />

            <Text style={styles.text} appearance="hint" category="s2">
              {`${
                Math.round((props.location.dist.calculated / 1000) * 10) / 10
              } km`}
            </Text>
          </View>

          <View style={styles.closeWindow}>
            <TouchableWithoutFeedback onPress={() => props.showPopUp(null)}>
              <LocationIcons name="close-outline" style={styles.icon} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Card>
    </FadeInView>
  );
};
const themedStyles = StyleService.create({
  text: {
    fontFamily: "opensans-regular",
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  icon: {
    marginTop: 5,
    width: 24,
    height: 24,
  },
  slacklineIcon: {
    height: 30,
    tintColor: "text-hint-color",
  },
  iconStyle: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10,
  },
  closeWindow: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -15,
    marginRight: -20,
    paddingLeft: 5,
  },
  tittle: {
    flex: 1,
    top: -5,
    marginBottom: -10,
  },
  image: {
    flex: 1,
    marginBottom: -16,
    marginLeft: -24,
    marginTop: -18,
  },
});
export default PopUpLocation;
