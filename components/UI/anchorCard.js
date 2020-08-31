import React from "react";
import { View } from "react-native";
import { Card, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import { HighlineIcon } from "../UI/appIcon";

export const AnchorCard = (props) => {
  const styles = useStyleSheet(themedStyles);
  const { hint, info, ...restProps } = props;
  const renderMainAnchor = () => {
    const icons = [];
    for (let i = 0; i < info.howManyOnMain; i++) {
      icons.push(
        <HighlineIcon
          key={i}
          {...styles.icon}
          name={info.main.toLowerCase().replace("_", "-")}
        />
      );
    }
    return [...icons];
  };
  const renderBackUpAnchor = () => {
    const icons = [];
    for (let i = 0; i < info.howMany; i++) {
      icons.push(
        <HighlineIcon
          key={i}
          {...styles.icon}
          name={info.main.toLowerCase().replace("_", "-")}
        />
      );
    }
    return [...icons];
  };
  return (
    <Card {...restProps}>
      <View style={styles.topContainer}>
        <Text appearance="hint">Anchor Type</Text>
        <View style={styles.iconContainer}>
          {renderMainAnchor()}
          <Text appearance="hint" category="c1" style={styles.text}>
            main
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {renderBackUpAnchor()}
          <Text appearance="hint" category="c1" style={styles.text}>
            backup
          </Text>
        </View>
      </View>
    </Card>
  );
};

const themedStyles = StyleService.create({
  topContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  valueLabel: {
    marginTop: 10,
    fontFamily: "opensans-regular",
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "text-hint-color",
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
  },
});
