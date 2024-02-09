import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import TodoList from "./Components/TodoList";
import AnimatedButton from "./Components/AnimatedButton";
const App = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a7e8",
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
