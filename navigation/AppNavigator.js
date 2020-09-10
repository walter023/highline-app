import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import Map from "../screens/Map";
import Profile from "../screens/Profile";
import LocationList from "../screens/LocationList";
import Highlines from "../components/highlines/highlines";
import Highline from "../components/highlines/highline";
import SearchLocation from "../components/location/searchLocation";
import SingIn from "../components/auth/singIn";
import SingUp from "../components/auth/singUp";
import Form from "../components/form/form"
const { Navigator, Screen } = createBottomTabNavigator();

const worldIcon = (props) => <Icon {...props} name="globe-2-outline" />;
const meIcon = (props) => <Icon {...props} name="settings-2-outline" />;
const listIcon = (props) => <Icon {...props} name="list-outline" />;

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    indicatorStyle={{
      borderRadius: 100,
    }}
  >
    <BottomNavigationTab title="Home" icon={worldIcon} />
    <BottomNavigationTab title="List" icon={listIcon} />
    <BottomNavigationTab title="Me" icon={meIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={Map} />
    <Screen name="List" component={LocationList} />
    <Screen name="Me" component={Profile} />
  </Navigator>
);

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      animation="fade"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: config,
        },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Highines" component={Highlines} />
      <Stack.Screen name="Highine" component={Highline} />
      <Stack.Screen name="SingIn" component={SingIn} />
      <Stack.Screen name="SingUp" component={SingUp} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen
        name="Search"
        component={SearchLocation}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <HomeStack />
  </NavigationContainer>
);

export default AppNavigator;
