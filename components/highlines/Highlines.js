import React from "react";
import { TouchableOpacity, ImageBackground, View } from "react-native";
import {
  List,
  Text,
  Button,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import { HighlineIcon } from "../UI/AppIcon";
import { ImageOverlay } from "../UI/ImageOverlay";
import { TopNav } from "../UI/TopNav";

export default ({ navigation, route }) => {
  const { location } = route.params;
  const styles = useStyleSheet(themedStyles);

  const isItemReverse = (index) => {
    return index % 2 === 1;
  };

  const Canyon = () => (
    <HighlineIcon name="mountain" size={28} style={styles.iconButton} />
  );

  const lengthIcon = () => (
    <HighlineIcon name="length" size={30} style={styles.iconButton} />
  );

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
    return (
      <TouchableOpacity
        style={[
          styles.item,
          isItemReverse(highline.index) && styles.itemReverse,
        ]}
        activeOpacity={0.95}
        onPress={() =>
          navigation.navigate("Highine", {
            locationId: location._id,
            highline: highline.item,
          })
        }
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
            <Button appearance="ghost" status="basic" accessoryLeft={Canyon}>
              {highline.item.high}
            </Button>
            <Button
              appearance="ghost"
              accessoryLeft={lengthIcon}
              status="basic"
            >
              {highline.item.long}
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TopNav navigation={navigation} tittle="Highlines" />
      <List
        style={styles.list}
        data={location.highlines}
        renderItem={renderHighline}
        ListHeaderComponent={RenderHeadingItem}
        keyExtractor={(highline) => highline._id}
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
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
    tintColor: "text-hint-color",
  }
 
});
