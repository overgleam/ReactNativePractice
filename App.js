import React from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import Navigation from "./Components/Activity 5/Navigation";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    "CabinetGrotesk-Medium": require("./assets/fonts/CabinetGrotesk/CabinetGrotesk-Medium.ttf"),
    "CabinetGrotesk-Bold": require("./assets/fonts/CabinetGrotesk/CabinetGrotesk-Extrabold.ttf"),
    "CabinetGrotesk-Black": require("./assets/fonts/CabinetGrotesk/CabinetGrotesk-Black.ttf"),
    "CabinetGrotesk-Variable": require("./assets/fonts/CabinetGrotesk/CabinetGrotesk-Variable.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
  },
});
