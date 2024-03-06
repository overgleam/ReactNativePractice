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
import { db } from "./Database";

const Add = ({ navigation }) => {
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addConfirmPassword, setAddConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleAdd = () => {
    if (addName === "" || addEmail === "" || addPassword === "") {
      alert("Please fill up the form");
      return;
    } else if (addPassword !== addConfirmPassword) {
      alert("Password does not match");
      return;
    } else if (!validateEmail(addEmail)) {
      alert("Invalid email format");
      return;
    } else {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [addName, addEmail, addPassword],
            (_, { rows }) => {
              console.log("User added successfully");
              navigation.goBack();
            },
            (error) => console.log("Error adding user: ", error)
          );
        },
        (error) => console.log("Error adding user: ", error)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          lineHeight: 30,
        }}
      ></Text>

      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={onFocus ? -100 : 100}
      >
        <View style={styles.addContainer}>
          <Text style={styles.capitalText}>Name</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCorrect={false}
              textContentType="username"
              autoCapitalize="none"
              autoComplete="off"
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              value={addName}
              onChangeText={setAddName}
            />
          </View>

          <Text style={styles.capitalText}>Email</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCorrect={false}
              textContentType="username"
              autoCapitalize="none"
              autoComplete="off"
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              value={addEmail}
              onChangeText={setAddEmail}
            />
          </View>

          <Text style={styles.capitalText}>Password</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCorrect={false}
              autoComplete="off"
              textContentType="oneTimeCode"
              secureTextEntry={!showPassword}
              value={addPassword}
              onChangeText={setAddPassword}
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

          <Text style={styles.capitalText}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-check"
              size={24}
              color="#2b3034"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              autoCorrect={false}
              autoComplete="off"
              textContentType="oneTimeCode"
              secureTextEntry={!showConfirmPassword}
              value={addConfirmPassword}
              onChangeText={setAddConfirmPassword}
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </Pressable>
          </View>

          <View style={styles.loginButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.addButton,
                {
                  top: pressed ? 4 : 0,
                  left: pressed ? 4 : 0,
                  shadowOpacity: pressed ? 0 : 1,
                },
              ]}
              onPress={handleAdd}
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                color="#2b3034"
                style={{ right: 10 }}
              />
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                {
                  top: pressed ? 4 : 0,
                  left: pressed ? 4 : 0,
                  shadowOpacity: pressed ? 0 : 1,
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="login"
                size={24}
                color="#2b3034"
                style={{ right: 10 }}
              />
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
    justifyContent: "center",
  },
  addContainer: {
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
  capitalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#2b3034",
    fontFamily: "CabinetGrotesk-Black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ebdedc",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    fontFamily: "CabinetGrotesk-Bold",
    padding: 15,
  },
  loginButtonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonText: {
    letterSpacing: 0.5,
    color: "#2b3034",
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Bold",
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#f7b302",
    marginRight: 10,
    flex: 1,
    flexDirection: "row",
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
  cancelButton: {
    backgroundColor: "#fd84e3",
    marginHorizontal: 5,

    flex: 1,
    flexDirection: "row",
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
});
