import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigator from "./Components/Prelim3/Navigator";
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
