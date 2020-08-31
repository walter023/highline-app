import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class LocationItem extends PureComponent {
  handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id);
    const search = {
      name: res.formatted_address,
      coords: res.geometry.location,
    };
   
    this.props.navigation.goBack();;
    this.props.onSearch(search);
   
  };
  render() {
    return (
      <TouchableOpacity style={styles.root} onPress={this.handlePress}>
        <Text style={styles.text} appearance="hint" category="s1">
          {this.props.description}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    height: 40,
    width: Dimensions.get("window").width - 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    marginHorizontal: 16,
    marginVertical: 2,
    fontFamily: "opensans-regular",
    // color: "#fff"
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (search) => dispatch(actions.onSearch(search)),
  };
};

export default connect(null, mapDispatchToProps)(LocationItem);
