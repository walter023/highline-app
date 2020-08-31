import React, { useEffect } from "react";
import { Animated, FlatList } from "react-native";
import { Layout, TopNavigation } from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { TopNav } from "../components/UI/topNav";
import ContainerCard from "../components/highlines/containerCard";
import * as actions from "../store/actions/index";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocationList = ({navigation}) => {
  const locations  = useSelector((state) => state.data.locations);
  const highlines  = useSelector((state) => state.data.highlines);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.filterHighlines());
  }, [locations]);
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <Layout level="4" style={{height:"100%"}}>
     <TopNav navigation={navigation} tittle="Highlines" />
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={highlines}

        renderItem={({ index, item: item }) => (
          <ContainerCard {...{ index, y, item }} navigation={navigation} />
        )}
        keyExtractor={(item) => item.highline._id}
        {...{ onScroll }}
      />
    </Layout>
  );
};

export default LocationList;
