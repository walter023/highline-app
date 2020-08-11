import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./theme.json";
//import { iconRegister } from './utilities/iconRegister';

import highlineReducer from "./store/reducers/highline";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";

enableScreens();

const rootReducer = combineReducers({
  data: highlineReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

let customFonts = {
  "opensans-regular": require("./assets/fonts/opensans-regular.ttf"),
  "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
  "highline-set-icons": require("./assets/fonts/highline-set-icons.ttf"),
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  componentDidMount() {
    this.loadResourcesAsync();
    this.setState({ isLoadingComplete: true });
  }

  loadResourcesAsync = async () => {
    return await Font.loadAsync(customFonts);
  };
  render() {
    if (this.state.isLoadingComplete) {
      return (
        <React.Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </ApplicationProvider>
        </React.Fragment>
      );
    } else {
      return <AppLoading />;
    }
  }
}
