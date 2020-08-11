import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import {
  Divider,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from "@ui-kitten/components";
import { BackIcon, roundedHanger } from "../UI/appIcon";
import { ImageOverlay } from "../UI/ImageOverlay";

import { HeartIcon, MessageCircleIcon } from "../UI/appIcon";

export default ({ navigation, route }) => {
  const { location } = route.params;
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const isItemReverse = (index) => {
    return index % 2 === 1;
  };
  const RenderHeadingItem = () => {
    const random = Math.floor(Math.random() * location.highlines.length);
    return (
      <ImageOverlay
        style={styles.headingArticleContainer}
        source={{
          uri:
            location.highlines[random].imagesUrl[
              Math.floor(
                Math.random() * location.highlines[random].imagesUrl.length
              )
            ],
        }}
      >
        <Text style={styles.headingArticleTitle} status="control" category="h3">
          {location.name}
        </Text>
        <Text
          style={styles.headingArticleDescription}
          category="h6"
          status="control"
        >
          {`${
            Math.round((location.dist.calculated / 1000) * 10) / 10
          } km from ya!`}
        </Text>
      </ImageOverlay>
    );
  };

  const renderHighline = (highline) => {
    //console.log(highline);
    return (
      <TouchableOpacity
        style={[
          styles.item,
          isItemReverse(highline.index) && styles.itemReverse,
        ]}
        activeOpacity={0.95}
        // onPress={() => onItemPress(info.index + 1)}
      >
        <ImageBackground
          style={styles.itemSection}
          source={{
            uri:
              highline.item.imagesUrl[
                Math.floor(Math.random() * highline.item.imagesUrl.length)
              ],
          }}
        />
        <View style={styles.itemSection}>
          <Text style={styles.itemTitle} category="h5">
            {highline.item.name}
          </Text>
          <View style={styles.itemReactionsContainer}>
            <Button
              style={styles.iconButton}
              appearance="ghost"
              status="basic"
              accessoryLeft={MessageCircleIcon}
            >
              2
            </Button>
            <Button
              style={styles.iconButton}
              appearance="ghost"
              status="danger"
              accessoryLeft={HeartIcon}
            >
              1
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <TopNavigation
        title="Location Details"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <List
        style={styles.list}
        data={location.highlines}
        renderItem={renderHighline}
        ListHeaderComponent={RenderHeadingItem}
        keyExtractor={(highline) => highline._id}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  headingArticleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 320,
  },
  headingArticleTitle: {
    fontFamily: "opensans-regular",
    zIndex: 1,
    textAlign: "center",
  },
  headingArticleDescription: {
    fontFamily: "opensans-regular",
    zIndex: 1,
  },
  item: {
    flexDirection: "row",
    minHeight: 188,
  },
  itemReverse: {
    flexDirection: "row-reverse",
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  itemReactionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginHorizontal: -8,
  },
  itemTitle: {
    flex: 1,
    fontFamily: "opensans-regular",
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
