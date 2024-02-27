import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Email from "./Emails.json";

const LoginEmail = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateToFlatListEmail = () => {
    const matchEmail = Email.find(
      (e) => e.email === email && e.password === password
    );
    if (matchEmail) {
      navigation.navigate("FlatListEmail");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        padding: 20,
        backgroundColor: "#95a7e8",
      }}
    >
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.loginText}>Email</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Enter your username"
            value={email}
            onChangeText={(text) => setEmail(text)}
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

        <TouchableOpacity
          style={styles.loginButton}
          onPress={navigateToFlatListEmail}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <StatusBar style="auto"></StatusBar>
      </View>
    </View>
  );
};

export default LoginEmail;

const styles = StyleSheet.create({
  loginContainer: {
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
