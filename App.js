import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Login from "./Components/Login";
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
          <Text>Welcome</Text>
          <Text>Login Successfully!</Text>
          <Button
            onPress={() => setModalIsVisible(false)}
            title="Log out"
          ></Button>
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
    backgroundColor: "#f3ebea",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
