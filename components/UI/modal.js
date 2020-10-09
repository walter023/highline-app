import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text, Icon } from "@ui-kitten/components";
import { CloseIcon } from "./AppIcon";

export const ModalApp = (props) => {
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    setVisible(props.message !== null);
  }, [props.message]);
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true} style={styles.container}>
        <View style={styles.closeButton}>
          <Button
            appearance="ghost"
            status="basic"
            accessoryLeft={CloseIcon}
            onPress={() => setVisible(false)}
          />
        </View>
        <View style={{top:-20, flexDirection:"row"}}>
        <Icon
            {...props}
            style={styles.icon}
            fill="#808080"
            name="alert-circle"
          />
          <Text category="s1"appearance="hint" style={styles.text}>
            {props.message}
          </Text>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    fontFamily: "opensans-regular",
  },
  closeButton: {
    top: -25,
    left: 40,
    alignItems: "flex-end",
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 5,
    marginTop:3
  },
});
