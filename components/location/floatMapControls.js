import {
  MenuItem,
  OverflowMenu,
  Button,
  withStyles,
  Text,
} from "@ui-kitten/components";
import { Mountain, Layers, Navigation } from "../../components/UI/appIcon";
import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../utilities/constans";

const floatMapControls = (props) => {
  const [visible, setVisible] = useState(false);
  const initialState = {
    satellite: null,
    standard: PRIMARY_COLOR,
    hybrid: null,
  };
  const [bgColors, setHighlighting] = useState(initialState);

  const renderToggleButton = () => (
    <Button name="anchor" style={{ display: "none" }} />
  );
  const renderTitle = (props, bgColor) => {
    const appearance = !bgColor ? "hint" : "default";
    return (
      <Text appearance={appearance} category="s2" style={{ left: 8 }}>
        {props}
      </Text>
    );
  };
  const setMap = (itemInfo, mapType) => {
    props.setMapType(mapType);
    const { row } = itemInfo.index;
    const itemHighlighted = { satellite: null, standard: null, hybrid: null };
    if (row === 0) {
      setHighlighting({ ...itemHighlighted, standard: PRIMARY_COLOR });
    }
    if (row === 1) {
      setHighlighting({ ...itemHighlighted, satellite: PRIMARY_COLOR });
    }
    if (row === 2) {
      setHighlighting({ ...itemHighlighted, hybrid: PRIMARY_COLOR });
    }
  };
  return (
    <View style={styles.mapType}>
      <OverflowMenu
        style={styles.overflowMenu}
        anchor={renderToggleButton}
        visible={visible}
        placement="left start"
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem
          onPress={(itemInfo) => setMap(itemInfo, "standard")}
          style={{ backgroundColor: bgColors.standard }}
          title={() => renderTitle("Standard", bgColors.standard)}
        />
        <MenuItem
          title={() => renderTitle("Satellite", bgColors.satellite)}
          style={{ backgroundColor: bgColors.satellite }}
          onPress={(itemInfo) => setMap(itemInfo, "satellite")}
        />

        <MenuItem
          title={() => renderTitle("Hybrid", bgColors.hybrid)}
          style={{
            backgroundColor: bgColors.hybrid,
          }}
          onPress={(itemInfo) => setMap(itemInfo, "hybrid")}
        />
      </OverflowMenu>

      <View style={styles.containerOffset}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={Layers}
          onPress={() => setVisible(true)}
        />
      </View>
      <View style={styles.containerOffset}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={Navigation}
          onPress={() => setVisible(true)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerOffset: {
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2.5 },
  },
  iconButton: {
    paddingHorizontal: 0,
    borderRadius: 300,
    borderWidth: 3,
    backgroundColor: "#222B45",
    overflow: "hidden",
    marginVertical: 5,
    width: 50,
    height: 50,
  },
  mapType: {
    position: "absolute",
    left: Dimensions.get("window").width - 60,
    bottom: Dimensions.get("window").height / 2,
  },
  overflowMenu: {
    left: 200,
    width: 90,
  },
});

export default floatMapControls;
