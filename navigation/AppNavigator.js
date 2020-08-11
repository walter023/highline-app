import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import Map from "../screens/Map";
import Location from "../screens/Location";
import Profile from "../screens/Profile";
import LocationList from "../screens/LocationList";
import Highlines  from  "../components/highlines/Highlines"

const { Navigator, Screen } = createBottomTabNavigator();

const worldIcon = (props) => <Icon {...props} name="globe-2-outline" />;
const meIcon = (props) => <Icon {...props} name="settings-2-outline" />;
const listIcon = (props) => <Icon {...props} name="list-outline" />;

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
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Highines" component={Highlines} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <HomeStack />
  </NavigationContainer>
);

export default AppNavigator;
