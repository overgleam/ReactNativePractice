import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "./Database";

const Edit = ({ navigation, route }) => {
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const key = route.params.key;

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEdit = () => {
    if (editName === "" || editEmail === "" || editPassword === "") {
      alert("Please fill up the form");
      return;
    } else if (editPassword !== editConfirmPassword) {
      alert("Password does not match");
      return;
    } else if (!validateEmail(editEmail)) {
      alert("Invalid email format");
      return;
    } else {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
            [editName, editEmail, editPassword, key],
            (_, { rows }) => {
              console.log("User updated successfully");
              navigation.goBack();
            },
            (error) => console.log("Error updating user: ", error)
          );
        },
        (error) => console.log("Error updating user: ", error)
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
        <View style={styles.editContainer}>
          <Text style={styles.capitalText}>New Name</Text>
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
              value={editName}
              onChangeText={setEditName}
            />
          </View>

          <Text style={styles.capitalText}>New Email</Text>
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
              value={editEmail}
              onChangeText={setEditEmail}
            />
          </View>

          <Text style={styles.capitalText}>New Password</Text>
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
              value={editPassword}
              onChangeText={setEditPassword}
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
              value={editConfirmPassword}
              onChangeText={setEditConfirmPassword}
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

          <View style={styles.ButtonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.editButton,
                {
                  top: pressed ? 4 : 0,
                  left: pressed ? 4 : 0,
                  shadowOpacity: pressed ? 0 : 1,
                },
              ]}
              onPress={handleEdit}
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                color="#2b3034"
                style={{ right: 10 }}
              />
              <Text style={styles.buttonText}>Edit</Text>
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

export default Edit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
    justifyContent: "center",
  },
  editContainer: {
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
  ButtonContainer: {
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

  editButton: {
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
