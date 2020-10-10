import React from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Button,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Divider,
  Avatar,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { ImageOverlay } from "../UI/ImageOverlay";
import { AnchorCard } from "../UI/anchorCard";
import { HighlineIcon } from "../UI/AppIcon";
import TruncateText from "../UI/TruncateText";
import { TopNav } from "../UI/TopNav";

const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1;
export default ({ navigation, route }) => {
  const { locationId, highline } = route.params;

  const locations = useSelector((state) => state.data.locations);
  const location = locations.filter((location) => location._id === locationId);

  const styles = useStyleSheet(themedStyles);

  const renderImageItem = (info) => (
    <Image style={styles.imageItem} source={{ uri: info.item }} />
  );
  const LatLng = {
    latitude: location[0].location.coordinates[1],
    longitude: location[0].location.coordinates[0],
  };
  const highIcon = () => (
    <HighlineIcon name="mountain" size={30} style={styles.iconButton} />
  );

  const lengthIcon = () => (
    <HighlineIcon name="length" size={35} style={styles.iconButton} />
  );
  return (
    <ScrollView style={styles.container}>
      <TopNav navigation={navigation} tittle="Highline" />
      <ImageOverlay
        style={styles.headerContainer}
        source={{
          uri:
            highline.imagesUrl[
              Math.floor(Math.random() * highline.imagesUrl.length)
            ],
        }}
      >
        <Text style={styles.headerTitle} category="h3" status="control">
          {highline.name}
        </Text>
      </ImageOverlay>
      <Divider />
      <View style={styles.establishedByContainer}>
        <Avatar
          source={{
            uri:
              highline.imagesUrl[
                Math.floor(Math.random() * highline.imagesUrl.length)
              ],
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.sectionLabel} category="s2">
            Established by
          </Text>
          <Text style={styles.sectionLabel} appearance="hint" category="s2">
            {highline.establishedBy}
          </Text>
        </View>
      </View>
      <View style={styles.infoHighline}>
        <Button appearance="ghost" status="basic" accessoryLeft={lengthIcon}>
          {highline.long.indexOf("m") === -1
            ? `${highline.long}m`
            : highline.long}
        </Button>
        <Button appearance="ghost" status="basic" accessoryLeft={highIcon}>
          {highline.high.indexOf("m") === -1
            ? `${highline.high}m`
            : highline.high}
        </Button>
      </View>
      <Text style={styles.sectionLabel}>About The Location</Text>
      <TruncateText text={location[0].description} />
      <Text style={styles.sectionLabel}>Anchors</Text>
      <View style={styles.anchorSection}>
        <AnchorCard style={styles.anchor} info={highline.anchors.lhs} />
        <AnchorCard style={styles.anchor} info={highline.anchors.rhs} />
      </View>
      <Text style={styles.sectionLabel}>Remarks</Text>
      <TruncateText text={highline.remarks} />
      <View style={{ flex: 1, alignItems: "center", marginVertical: 10 }}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            ...LatLng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker
            coordinate={LatLng}
            image={require("../../assets/map-14.png")}
          />
        </MapView>
      </View>
      <Text style={styles.sectionLabel}>Approach</Text>
      <TruncateText text={location[0].approach} />
      <Text style={styles.sectionLabel} category="p2">
        Photos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={highline.imagesUrl}
        renderItem={renderImageItem}
      />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
  },
  image: {
    height: 360,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 2,
    fontFamily: "opensans-regular",
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  headerContainer: {
    alignItems: "center",
    minHeight: 256,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: "center",
    marginVertical: 24,
    fontFamily: "opensans-regular",
    zIndex: 1,
  },
  establishedByContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  iconButton: {
    paddingHorizontal: 0,
    tintColor: "text-hint-color",
  },
  iconHighlighted: {
    paddingHorizontal: 0,
    tintColor: "color-primary-500",
  },
  anchorSection: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 8,
  },
  anchor: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoHighline: {
    flex: 1,
    flexDirection: "row-reverse",
    bottom: 10,
  },
  mapStyle: {
    width: 350,
    height: 350,
  },
});
