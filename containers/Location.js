import React, { Component, setState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Text, MenuItem, OverflowMenu, Button } from "@ui-kitten/components";
import * as actions from "../store/actions/index";
import PopUpLocation from "../components/location/popUpLocation";
import FloatControls from "../components/location/floatMapControls";

const defaultLocation = {
  lat: -33.7507,
  lng: 150.6877,
};
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 3.1922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Location extends Component {
  constructor(props) {
    super(props);
    // this.shakeIconRef = React.createRef();
    this.state = {
      location: null,
      mapType: "standard",
      region: {
        latitude: defaultLocation.lat,
        longitude: defaultLocation.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  componentDidMount() {
    // this.props.onInitHighlines(defaultLocation);
  }
  showpopUp(location) {
    this.setState((state, props) => ({
      location: location,
    }));
  }

  setMapType(type) {
    this.setState({ mapType: type });
  }

  render() {
    const { navigation } = this.props;

    const locations = this.props.locations.map((loc, index) => {
      const LatLng = {
        latitude: loc.location.coordinates[1],
        longitude: loc.location.coordinates[0],
      };
      return (
        <Marker
          key={index}
          coordinate={LatLng}
          onPress={() => this.showpopUp(loc)}
          image={require("../assets/favicon.png")}
        >
          <Callout onPress={() => this.showpopUp(loc)}>
            <Text style={styles.text} status="info">
              {loc.name}
            </Text>
          </Callout>
        </Marker>
      );
    });
    const locationPopUp = this.state.location ? (
      <PopUpLocation
        navigation={navigation}
        location={this.state.location}
        showPopUp={(value) => this.showpopUp(value)}
      />
    ) : null;

    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={this.state.region}
            mapType={this.state.mapType}
          >
            {locations}
          </MapView>
       
          <View style={styles.popUpContainer}>{locationPopUp}</View>
        </View>
        <FloatControls setMapType={(type) => this.setMapType(type)} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  text: {
    textAlign: "left",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  mapType: {
    position: "absolute",
    left: Dimensions.get("window").width - 60,
    bottom: Dimensions.get("window").height / 2,
  },
  popUpContainer: {
    width: "95%",
    bottom: 10,
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  overflowMenu: {
    left: 180,
    width: 120,
  },
});

const mapStateToProps = (state) => {
  return {
    locations: state.data.locations,
    error: state.data.message,
    loading: state.data.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitHighlines: (coords) => dispatch(actions.initHighlines(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
