import React, { useState, useEffect } from "react";
import { Button, Text } from "@ui-kitten/components";
import { View, StyleSheet, Dimensions } from "react-native";


const truncateText = (props) => {
  const [text, setText] = useState(props.text);
  const [visible, setVisible] = useState(false);
  const NUMBER_LINES = 580;
  useEffect(() => {
    const seeMore = text.length > NUMBER_LINES;
    setText(seeMore ? text.substring(0, NUMBER_LINES) : text);
    setVisible(seeMore);
  }, []);
  const setTruncate = () => {
    if (visible) {
      setText(props.text);
      setVisible(!visible);
    } else {
      setText(text.substring(0, NUMBER_LINES));
      setVisible(!visible);
    }
  };
  return (
    <View>
      {text.split("\\n").map((element, index) => (
        <Text
          key={index}
          style={styles.description}
          category="p1"
          appearance="hint"
        >
          {element}
        </Text>
      ))}
      <Button
        onPress={setTruncate}
        style={{
          ...styles.buttom,
          display: props.text.length > NUMBER_LINES ? "flex" : "none",
        }}
        appearance="ghost"
        status="basic"
       
      >
        <Text>{visible ? "... see more" : "... see less"}</Text>
        
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontFamily: "opensans-regular",
  },
  buttom: {
    marginTop: -15,
    left: Dimensions.get("window").width / 3,
  },
});

export default truncateText;
