import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";

export const ModalApp = (props) => {

  return (
    <Layout style={styles.container} level="1">
      <Modal visible={props.message == !null}>
        <Card disabled={true}>
          <Text>
            Welcome to Highline Guide Bd
          </Text>
          <Button status="basic">Welcome to Highline Guide Book UI 😻</Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 92,
    //position: "absolute",
    width: "95%",
    bottom: 10,
    // flex:1
  },
});
