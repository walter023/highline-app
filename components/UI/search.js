import React, { useState } from "react";
import { Input, Icon, Layout } from "@ui-kitten/components";
import { useSelector } from "react-redux";

const Search = (props) => {
  const shakeIconRef = React.useRef();
  const [status, setStatus] = useState("primary");
  const value = useSelector((state) =>
    state.data.search ? state.data.search.name : ""
  );
  React.useEffect(() => {
  
    shakeIconRef.current.startAnimation(() => setStatus("basic"));
  }, []);

  const renderShakeIcon = (props) => {
    return (
      <Layout
        style={{
          borderLeftWidth: 0,
          borderLeftColor: "rgba(143, 155, 179, 0.24)",
          backgroundColor: "",
        }}
      >
        <Icon
          {...props}
          ref={shakeIconRef}
          animation="shake"
          name="search-outline"
        />
      </Layout>
    );
  };

  const goToSearch = () => {
    props.navigation.navigate("Search");
  };

  return (
    <Input
      value={value}
      onFocus={goToSearch}
      placeholder="Map Search"
      accessoryRight={renderShakeIcon}
      status={status}
      size="large"
      textStyle={{ color: "#8F9BB3"}}
      style={{
        width: "85%",
        position: "absolute",
        zIndex: 5,
        marginTop: 60,
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.26,

        shadowOffset: { width: 0, height: 2 },
      }}
    />
  );
};

export default Search;
