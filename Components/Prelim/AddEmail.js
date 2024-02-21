import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";

const AddEmail = ({ navigation, route }) => {
  const { email } = route.params;
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAdd = () => {
    if (addEmail === "" || addPassword === "") {
      alert("Please fill up the form");
    } else if (!validateEmail(addEmail)) {
      alert("Invalid email format");
    } else {
      const maxKey = Math.max(...email.map((s) => parseInt(s.key)), 0);
      const newKey = (maxKey + 1).toString();

      const newEmail = {
        key: newKey,
        email: addEmail,
        password: addPassword,
      };

      email.push(newEmail);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          lineHeight: 30,
        }}
      ></Text>
      <View>
        <TextInput
          style={styles.modalTextInput}
          placeholder="Add Name"
          value={addEmail}
          onChangeText={setAddEmail}
        />
        <TextInput
          style={styles.modalTextInput}
          placeholder="Add Password"
          value={addPassword}
          onChangeText={setAddPassword}
          secureTextEntry={true}
        />

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
            width: "50%",
          }}
        >
          <TouchableOpacity
            style={styles.modalButton1}
            onPress={() => {
              handleAdd();
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton2}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddEmail;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalTextInput: {
    backgroundColor: "#fbe0dd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  modalButton1: {
    backgroundColor: "#f7b302",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
  },
  modalButton2: {
    backgroundColor: "#fd84e3",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 10,
  },
});
