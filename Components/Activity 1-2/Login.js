import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

const Login = ({ openModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginClick() {
    if (
      username.toLowerCase() === "admin" &&
      password.toLowerCase() === "admin"
    ) {
      openModal();
    } else {
      alert("Wrong answer! ");
    }
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Username</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Password</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto"></StatusBar>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    marginBottom: 200,
    marginHorizontal: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 20,

    backgroundColor: "#f3ebea",
    shadowColor: "black",
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  loginText: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  loginInput: {
    backgroundColor: "#ebdedc",
    fontSize: 16,

    borderWidth: 1,
    borderColor: "black",
    borderRadius: 13,

    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  loginButton: {
    alignSelf: "center",
    alignItems: "center",

    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#fce823",

    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
