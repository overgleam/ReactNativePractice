import React from "react";
import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

import StackNavigator from "./Components/SemiFinal2/StackNavigator";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
  },
});
