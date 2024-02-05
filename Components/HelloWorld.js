import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const HelloWorld = (props) => {
  return (
    <View>
      <Text>Hello World {props.name}</Text>
    </View>
  );
};

HelloWorld.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HelloWorld;
