import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const AnimatedButton = () => {
  const [onPress, setOnPress] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={() => setOnPress(true)}
        onPressOut={() => setOnPress(false)}
        style={onPress ? styles.buttonActive : styles.button}
      >
        <Text>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonActive: {
    backgroundColor: "#fce823",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    shadowOpacity: 0,

    top: 3,
    left: 4,
    padding: 10,
    margin: 5,
  },

  button: {
    backgroundColor: "#fce823",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    padding: 10,
    margin: 5,
  },
});
