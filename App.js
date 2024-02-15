import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import TodoList from "./Components/TodoList";
const App = () => {
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
});
