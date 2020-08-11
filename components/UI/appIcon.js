import React from "react";
import { Icon } from "@ui-kitten/components";
import HighlineIconsPack from "../../utilities/highlineIconsPack";
import { TINT_COLOR } from "../../utilities/constans";

// Eva Icons
export const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
export const HeartIcon = (style) => <Icon {...style} name="heart" />;
export const Layers = (style) => {
  const newStyle = { ...style, height: 24, width: 24 };
  return <Icon {...newStyle} name="layers-outline" />;
};
export const Map = (style) => <Icon {...style} name="map-outline" />;
export const Navigation = (style) => {
  // console.log(style);
  return <Icon {...style} name="navigation-2-outline" />;
};

export const MessageCircleIcon = (style) => (
  <Icon {...style} name="message-circle-outline" />
);

// highline-set-icons
export const RoundedHanger = (props) => {
  const style = props.style ? ovirrideStyle(props.style) : props;
  return <HighlineIconsPack {...style} name="rounded-hanger" size={24} />;
};

export const Risk = (props) => {
  const style = props.style ? ovirrideStyle(props.style) : props;
  return <HighlineIconsPack {...style} name="risk" size={24} />;
};

export const Mountain = (props) => {
  const style = props.style ? ovirrideStyle(props.style) : props;
  return (
    <HighlineIconsPack
      {...style}
      name="mountain1"
      size={20}
      color={TINT_COLOR}
    />
  );
};

/*export const Layers = (props) => {
  const style = props.style ? ovirrideStyle(props.style) : props;
  return (
    <HighlineIconsPack {...style} name="layers" size={20} color={TINT_COLOR} />
  );
};*/

export const MapFilled = (props) => {
  const style = props.style ? ovirrideStyle(props.style) : props;
  return (
    <HighlineIconsPack {...style} name="map" size={25} color={TINT_COLOR} />
  );
};
const ovirrideStyle = (KittenStyle) => {
  const style = { ...KittenStyle, color: KittenStyle.tintColor };
  delete KittenStyle.tintColor;
  return style;
};

/*
// highline-set-icons
export const RoundedHanger = (props) => {
  return (
    <HighlineIconsPack
      {...ovirrideStyle(props)}
      name="rounded-hanger"
      size={52}
      color="red"
    />
  );
};

const ovirrideStyle = (props) => {
  if (props.style) {
    const style = { ...KittenStyle, color: KittenStyle.tintColor };
    delete KittenStyle.tintColor;
    return style;
  } else {
    return props;
  }
};*/
