import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

const Login = ({ openModal }) => {
  function handleClick() {
    openModal();
  }
  return (
    <View style={styles.loginContainer}>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Username</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Enter your username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Password</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Enter your username"
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleClick}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    margin: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 20,
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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,

    // elevation: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
