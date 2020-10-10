import React, { useEffect, useState } from "react";
import { Select, IndexPath, SelectItem, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
const anchorType = [
  "Select Anchor Type",
  "Tree",
  "Carrot",
  "Ring Bolt",
  "Sandstone",
  "Fixed Hanger",
  "Threaded Rod",
  "Rounded Hanger",
  "Threaded Through",
  "Horn",
];
const ComboBox = (props) => {
  const [IndexComboBox, setIndexComboBox] = useState(new IndexPath(0));
  const renderSelectOption = (title, index) => (
    <SelectItem title={() => textStyle(title)} key={index} />
  );
  const displayValue = anchorType[IndexComboBox.row];
  const { onSelectChange, id } = props;
  const textStyle = (value, category) => (
    <Text style={styles.label} category={category}>
      {value}
    </Text>
  );
  useEffect(() => {
    onSelectChange(id, displayValue, IndexComboBox.row !== 0);
  }, [displayValue, onSelectChange, id]);
  return (
    <Select
      {...props}
      label={() => textStyle(props.label, "s1")}
      style={styles.select}
      value={() => textStyle(displayValue, "p2")}
      selectedIndex={IndexComboBox}
      onSelect={(index) => setIndexComboBox(index)}
    >
      {anchorType.map(renderSelectOption)}
    </Select>
  );
};
const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
    marginTop: 20,
  },
  label: {
    fontFamily: "opensans-regular",
  },
});
export default ComboBox;
