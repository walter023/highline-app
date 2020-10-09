import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as actions from "../../store/actions/index";
import PopUpLocation from "./PopUpLocation";
import FloatControls from "./FloatMapControls";

const coordinates = {
  lat: -33.7507,
  lng: 150.6877,
};
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 4.1922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Location extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      location: null,
      mapType: "standard",
      region: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.search !== prevProps.search) {
      const newRegion = {
        ...this.state.region,
        latitude: this.props.search.coords.lat,
        longitude: this.props.search.coords.lng,
      };
      this.setState({ region: newRegion });
      this.mapRef.current.animateToRegion({ ...newRegion });
      const coordinates = {
        lat: this.props.search.coords.lat,
        lng: this.props.search.coords.lng,
      };
      this.props.onInitHighlines(coordinates);
    }
  }
  componentDidMount() {
    if (this.mapRef.current) {
      this.mapRef.current.animateToRegion({
        ...this.state.region,
      });
    }
    this.props.onInitHighlines(coordinates);
  }
  rederpopUp(location, coordinate) {
    let region = { ...this.state.region };
    if (coordinate) {
      region = {
        ...coordinate,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
      };
    }
    this.mapRef.current.animateToRegion({
      ...region,
    });
    this.setState((state, props) => ({
      location: location,
    }));
  }
  setMapType(type) {
    this.setState({ mapType: type });
  }
  setRegion() {
    if (this.mapRef.current) {
      this.mapRef.current.animateToRegion({
        ...this.state.region,
        latitude: this.props.search.coords.lat,
        longitude: this.props.search.coords.lng,
      });
    }
  }
  render() {
    const { navigation } = this.props;
    let locations =
      this.props.locations.length > 0
        ? this.props.locations.map((loc, index) => {
            const latLng = {
              latitude: loc.location.coordinates[1],
              longitude: loc.location.coordinates[0],
            };
            return (
              <Marker
                key={index}
                coordinate={latLng}
                onPress={() => this.rederpopUp(loc, latLng)}
              
              >
                <Image
                  source={require("../../assets/map-15.png")}
                  style={styles.image}
                />
              </Marker>
            );
          })
        : null;
    let locationPopUp = this.state.location ? (
      <PopUpLocation
        navigation={navigation}
        location={this.state.location}
        showPopUp={(value) => this.rederpopUp(value)}
      />
    ) : null;

    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView
            ref={this.mapRef}
            style={styles.mapStyle}
            initialRegion={this.state.region}
            mapType={this.state.mapType}
          >
            {locations}
          </MapView>
          <FloatControls setMapType={(type) => this.setMapType(type)} />
          <View style={styles.popUpContainer}>{locationPopUp}</View>
        </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loading: {
    top: Dimensions.get("window").height / 2,
    left: Dimensions.get("window").width / 2,
  },
  popUpContainer: {
    width: "95%",
    bottom: 10,
    position: "absolute",
  },
  image: {
    width: 60,
    height: 60,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  overflowMenu: {
    left: 10,
    width: 120,
  },
});

const mapStateToProps = (state) => {
  return {
    locations: state.data.locations,
    message: state.data.message,
    loading: state.data.loading,
    search: state.data.search,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitHighlines: (coords) => dispatch(actions.initHighlines(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
