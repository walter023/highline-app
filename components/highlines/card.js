import React, { PureComponent } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Card, Text, Icon } from "@ui-kitten/components";
import { HighlineIcon } from "../UI/appIcon";

const { width } = Dimensions.get("window");
//const ratio = 228 / 295;
export const CARD_WIDTH = width - 50; //width * 0.80;
export const CARD_HEIGHT = 250; //CARD_WIDTH * ratio;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
  },
  footerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 8,
  },
  headerImage: {
    height: 130, 
    width: CARD_WIDTH,
    marginLeft: -25,
   marginVertical: -15,
  },
  text: {
    fontFamily: "opensans-regular",
  },
  headerContainer: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distanceContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

class HighlineCard extends PureComponent {
  header(props) {
    return (
      <View {...props} style={styles.headerContainer}>
        <View>
          <Text style={styles.text} category="h6">
            {props.highline.name}
          </Text>
          <Text style={styles.text} appearance="hint" category="s1">
            {props.locationName}
          </Text>
        </View>
        <View style={styles.distanceContainer}>
          <Icon
            name="pin-outline"
            style={{ width: 20, height: 20 }}
            fill="#8F9BB3"
          />
          <Text style={styles.text} appearance="hint" category="c1">
            {Math.round((props.dist / 1000) * 10) / 10}
          </Text>
        </View>
      </View>
    );
  }

  footer(props) {
    return (
      <View {...props} style={{ flexDirection: "row" }}>
        <View {...props} style={styles.footerContainer}>
          <HighlineIcon
            name="rope-swing"
            size={24}
            style={{ tintColor: "#8F9BB3" }}
          />
          <Text style={styles.text} appearance="hint" category="c1">
            {props.highline.high.indexOf("m") === -1
              ? `${props.highline.high}m`
              : props.highline.high}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <HighlineIcon
            name="rope"
            size={24}
            style={{ tintColor: "#8F9BB3" }}
          />
          <Text style={styles.text} appearance="hint" category="c1">
            {props.highline.long.indexOf("m") === -1
              ? `${props.highline.long}m`
              : props.highline.long}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Card
          onPress={() =>
            this.props.navigation.navigate("Highine", {
              locationId: this.props.item.locationId,
              highline: this.props.item.highline,
            })
          }
          style={styles.card}
          header={() => this.header(this.props.item)}
          footer={() => this.footer(this.props.item)}
        >
          <Image
            source={{
              uri: this.props.item.highline.imagesUrl[
                Math.floor(
                  Math.random() * this.props.item.highline.imagesUrl.length
                )
              ],
            }}
            style={styles.headerImage}
          />
        </Card>
      </React.Fragment>
    );
  }
}
export default HighlineCard;
