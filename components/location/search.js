import React, { useState } from "react";
import { Input, Icon, Layout } from "@ui-kitten/components";

const Search = (props) => {
  const shakeIconRef = React.useRef();
  const [status, setStatus] = useState("primary");
  React.useEffect(() => {
    shakeIconRef.current.startAnimation(() => setStatus("basic"));
  }, []);

  const renderShakeIcon = (props) => {
    return (
      <Layout
        style={{
          borderLeftWidth: 1,
          borderLeftColor: "rgba(143, 155, 179, 0.24)",
          backgroundColor: "#222B45 !important",
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

  return (
    <Input
      placeholder="Map Search"
      accessoryRight={renderShakeIcon}
      status={status}
      size="large"
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
