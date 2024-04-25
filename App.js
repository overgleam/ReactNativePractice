import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import StackNavigator from "./Components/SemiFinal/StackNavigator";

const App = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121013",
  },
});
