import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db, initDatabase } from "./Database";

const Login = ({ navigation }) => {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);
  useEffect(() => {
    if (!databaseInitialized) {
      initDatabase();
      setDatabaseInitialized(true);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const defaultUser = { username: "mobile@uc.com", password: "12345" };

  const handleLogin = () => {
    if (username === "" || password === "") {
      alert("Username and password are required");
      return;
    } else if (
      username === defaultUser.username &&
      password === defaultUser.password
    ) {
      navigation.navigate("FlatLess");
      return;
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [username, password],
          (_, { rows }) => {
            if (rows.length > 0) {
              navigation.navigate("FlatLess");
              console.log(rows);
            } else {
              alert("Invalid username or password");
              console.log(rows);
            }
          }
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.loginInputContainer}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Username"
              autoCorrect={false}
              textContentType="username"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={styles.passwordText}>Password</Text>
          <View style={styles.passwordContainer}>
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </Pressable>
          </View>
          <View style={styles.loginButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                {
                  top: pressed ? 4 : 0,
                  left: pressed ? 4 : 0,
                  shadowOpacity: pressed ? 0 : 1,
                },
              ]}
              onPress={handleLogin}
            >
              <MaterialCommunityIcons
                name="login"
                size={24}
                color="#2b3034"
                style={{ right: 10 }}
              />
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
    justifyContent: "center",
  },
  loginContainer: {
    alignSelf: "center",
    borderWidth: 2.5,
    borderRadius: 10,
    padding: 20,
    width: "80%",

    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    backgroundColor: "#f3ebea",
    elevation: 10,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b3034",
    marginBottom: 10,
    fontFamily: "CabinetGrotesk-Black",
  },
  loginInputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ebdedc",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  icon: {
    top: "auto",
    left: 15,
  },
  loginInput: {
    flex: 1,
    fontFamily: "CabinetGrotesk-Bold",

    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  passwordText: {
    fontSize: 24,
    color: "#2b3034",
    fontWeight: "bold",
    fontFamily: "CabinetGrotesk-Black",
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ebdedc",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "CabinetGrotesk-Bold",

    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  loginButtonContainer: {
    marginVertical: 20,
  },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "#fce823",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",

    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 20,

    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 10,
  },
  loginButtonText: {
    letterSpacing: 0.5,
    color: "black",
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Black",
    fontWeight: "bold",
  },
});
