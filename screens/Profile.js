import React from "react";
import {
  Text,
  Layout,
  Toggle,
  TopNavigation,
  Divider,
} from "@ui-kitten/components";
import ThemeContext from "../utilities/themeContext";

class Me extends React.Component {
  render() {
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="Settings"
          alignment="center"
          //   accessoryLeft={BackAction}
        />
        <Divider />
        <Layout style={{ flexDirection: "row-reverse", top: 20 }}>
          <ThemeContext.Consumer>
            {(context) => (
              <React.Fragment>
                <Toggle
                  checked={context.theme === "dark"}
                  onChange={() => context.setTheme(context.theme)}
                >
                  Dark Mode
                </Toggle>
                <Divider />
              </React.Fragment> 
            )}
          </ThemeContext.Consumer>
        </Layout>
      </Layout>
    );
  }
}

export default Me;
