import React from "react";
import { StyleSheet } from "react-native";
import Icon from "../components/HighlineIcons";

export const HighlineIconsPack = {
  name: "Highline",
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = (name) => ({
  toReactElement: (props) => HighlineIcon({ name, ...props }),
});

function HighlineIcon({ name, style }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
