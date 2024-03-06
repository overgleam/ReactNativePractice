import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";
import Navigator from "./Components/Activity 4/Navigator";
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Navigator />
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
