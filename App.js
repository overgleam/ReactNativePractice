import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Login from "./Components/Login";
import { useState } from "react";
import * as Font from "expo-font";

const App = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalIsVisible}
        animationType="slide"
        onRequestClose={() => setModalIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText2}>Login Successfully!</Text>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalIsVisible(false)}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Login openModal={() => setModalIsVisible(true)} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f096e3",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#f3ebea",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 60,
    fontWeight: "900",
    margin: 20,
  },
  welcomeText2: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fdbf1e", // Button background color
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5, // Border radius to create rounded corners
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
