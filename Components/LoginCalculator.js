import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

const LoginCalculator = ({ openModal }) => {
  const [password, setPassword] = useState("");

  function buttonClick(num) {
    if (password.length < 8) {
      setPassword(password + num);
    }
  }
  function removeButton() {
    setPassword(password.slice(0, -1));
  }
  function loginButton() {
    if (password === "20262937") {
      openModal();
    } else {
      Alert.alert("Invalid Id", "Please try again");
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.loginContainer}>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={"#6b6661"}
          style={styles.textInput}
          value={password}
          secureTextEntry={true}
          editable={false}
          selectable={false}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("1")}
          >
            <Text style={styles.texts}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("2")}
          >
            <Text style={styles.texts}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("3")}
          >
            <Text style={styles.texts}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("4")}
          >
            <Text style={styles.texts}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("5")}
          >
            <Text style={styles.texts}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("6")}
          >
            <Text style={styles.texts}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("7")}
          >
            <Text style={styles.texts}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("8")}
          >
            <Text style={styles.texts}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("9")}
          >
            <Text style={styles.texts}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => buttonClick("0")}
          >
            <Text style={styles.texts}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => removeButton()}
          >
            <Text style={styles.texts}>❌</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => loginButton()}
          >
            <Text style={styles.texts}>✔️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginCalculator;

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#f3ebea",
    width: 300,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,

    padding: 20,

    shadowColor: "black",
    shadowOffset: { height: 5, width: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 5,
  },
  textInput: {
    backgroundColor: "#ebdedc",

    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,

    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 10,

    elevation: 5,

    textAlign: "center",
    fontWeight: "100",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    marginTop: 10,
    justifyContent: "space-around",
  },
  buttons: {
    backgroundColor: "#fdbf1e",
    height: 50,
    width: 50,

    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,

    margin: 10,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 5,

    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#36e388",
    height: 50,
    width: 50,

    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,

    margin: 10,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 5,

    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
});
