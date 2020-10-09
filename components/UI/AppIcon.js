import React from "react";
import { Icon } from "@ui-kitten/components";
import HighlineIconsPack from "../../utilities/highlineIconsPack";

// Eva Icons
export const CloseIcon = (props) => <Icon {...props} name="close-outline" />;
export const Person = (props) => <Icon {...props} name="person-outline" />;
export const GoogleIcon = (style) => <Icon {...style} name="google" />;
export const FacebookIcon = (style) => <Icon {...style} name="facebook" />;
export const TwitterIcon = (style) => <Icon {...style} name="twitter" />;
export const InfoIcon = (style) => (
  <Icon {...style} name="info-outline" />
);
export const Camera = (style) => (
  <Icon {...style} name="camera-outline" />
);
export const ArrowForwardIconOutline = (style) => (
  <Icon {...style} name="arrow-forward-outline" />
);
export const BackIcon = (props) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);
export const MoreIcon = (props) => (
  <Icon {...props} name="more-horizontal-outline" />
);  
export const HeartIcon = (style) => {
  return <Icon {...style} name="heart" />;
};
export const Layers = (style) => {
  const newStyle = { ...style, height: 24, width: 24 };
  return <Icon {...newStyle} name="layers-outline" />;
};
export const Map = (style) => <Icon {...style} name="map-outline" />;

export const Navigation = (style) => {
  const newStyle = { ...style, height: 24, width: 24 };
  return <Icon {...newStyle} name="navigation-2-outline" />;
};
export const Length = (style) => {
  return <Icon {...style} name="minus" />;
};
export const MessageCircleIcon = (style) => (
  <Icon {...style} name="message-circle-outline" />
);
// highline-set-icons
export const HighlineIcon = (props) => {
  const style = props.style ? { ...props.style, ...props } : { ...props };
  style.color = style.tintColor;
  style.size = style.size || style.height;
  delete style.style;
  delete style.tintColor;
  return <HighlineIconsPack {...style} />;
};
