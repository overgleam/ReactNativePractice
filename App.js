import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import StackNavigator from "./Components/Prelim/StackNavigator";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigator />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a7e8",
  },
});
