import React from "react";
import {
  TopNavigationAction,
  Divider,
  TopNavigation,
} from "@ui-kitten/components";
import { BackIcon, Person } from "./AppIcon";

export const TopNav = ({ navigation, tittle }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const navigateLogIn = () => {
    navigation.navigate("SingIn");
  };
  const BackAction = () => (
    <TopNavigationAction
      style={{ paddingTop: 10 }}
      icon={BackIcon}
      onPress={navigateBack}
    />
  );
  const LogIn = () => (
    <TopNavigationAction
      style={{ paddingTop: 10 }}
      icon={Person}
      onPress={navigateLogIn}
    />
  );
  return (
    <React.Fragment>
      <TopNavigation
        title={tittle}
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={LogIn}
      />
      <Divider />
    </React.Fragment>
  );
};
