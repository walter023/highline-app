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
//import { composeWithDevTools } from "redux-devtools-extension";
//import { iconRegister } from './utilities/iconRegister';
import { StatusBar } from "expo-status-bar";
import highlineReducer from "./store/reducers/highline";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";
import ThemeContext from "./utilities/themeContext";
enableScreens();

const rootReducer = combineReducers({
  data: highlineReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,

  applyMiddleware(thunk)
);

let customFonts = {
  "opensans-regular": require("./assets/fonts/opensans-regular.ttf"),
  "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
  "highline-set-icons": require("./assets/fonts/highline-set-icons.ttf"),
};

class App extends React.Component {
  state = {
    isLoadingComplete: false,
    theme: "dark",
    evaTheme: eva.dark,
  };
  componentDidMount() {
    this.loadResourcesAsync();
    this.setState({ isLoadingComplete: true });
  }

  loadResourcesAsync = async () => {
    return await Font.loadAsync(customFonts);
  };
  setTheme(value) {
    if (value === "light") {
      this.setState({ theme: "dark", evaTheme: eva.dark });
    } else {
      this.setState({ theme: "light", evaTheme: eva.light });
    }
  }
  render() {
    if (this.state.isLoadingComplete) {
      const statusBarColor = this.state.theme === "dark" ? "light" : "dark";
      return (
        <React.Fragment>
          <StatusBar style={statusBarColor} />
          <ThemeContext.Provider
            value={{
              theme: this.state.theme,
              setTheme: (value) => this.setTheme(value),
            }}
          >
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
              {...eva}
              theme={{ ...this.state.evaTheme, ...theme }}
            >
              <Provider store={store}>
                <AppNavigator />
              </Provider>
            </ApplicationProvider>
          </ThemeContext.Provider>
        </React.Fragment>
      );
    } else {
      return <AppLoading />;
    }
  }
}

export default App;
