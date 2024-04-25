import React from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
<<<<<<< HEAD
import Navigation from "./Components/Activity 5/Navigation";
import { useFonts } from "expo-font";
=======
import StackNavigator from "./Components/SemiFinal/StackNavigator";
>>>>>>> semifinal

const App = () => {
  return (
<<<<<<< HEAD
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
    // </TouchableWithoutFeedback>
=======
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
>>>>>>> semifinal
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
  },
});
