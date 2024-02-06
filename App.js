import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Login from "./Components/Login";
import LoginCalculator from "./Components/LoginCalculator";
import { useState } from "react";

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

      {/* <Login openModal={() => setModalIsVisible(true)} /> */}
      <LoginCalculator openModal={() => setModalIsVisible(true)} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26a9c7",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#caeaf6",
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

    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
