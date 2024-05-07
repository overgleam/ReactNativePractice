import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import client from "./client";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "Username must contain only letters, numbers, and underscores"
    ),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email is invalid")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid"
    ),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignupForm = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitForm = async (values, formikActions) => {
    try {
      const response = await client.post("/signup", values);

      if (response.data.success) {
        alert("User created successfully");
        formikActions.resetForm();
        navigation.replace("Home", { success: true });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          const { username, email, password, confirmPassword } = values;
          return (
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={-50}
            >
              <>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginBottom: "10%",
                    color: "white",
                  }}
                >
                  Welcome to Sign Up
                </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Username</Text>
                  <Text style={styles.error}>
                    {touched.username && errors.username}
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor={"#f0dddb80"}
                  value={username}
                  autoCapitalize="none"
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Email</Text>
                  <Text style={styles.error}>
                    {touched.email && errors.email}
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={"#f0dddb80"}
                  onBlur={handleBlur("email")}
                  value={email}
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Password</Text>
                  <Text style={styles.error}>
                    {touched.password && errors.password}
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={"#f0dddb80"}
                  secureTextEntry
                  value={password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                />

                <View style={styles.inputContainer}>
                  <Text style={styles.title}>Confirm Password</Text>
                  <Text style={styles.error}>
                    {touched.confirmPassword && errors.confirmPassword}
                  </Text>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#f0dddb80"}
                  secureTextEntry
                  value={confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                />

                <TouchableOpacity
                  style={[styles.buttons, { backgroundColor: "lightblue" }]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                  <AntDesign name="login" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.buttonText}>Go Back</Text>
                  <AntDesign name="back" size={24} color="black" />
                </TouchableOpacity>
              </>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#121013",
  },
  input: {
    backgroundColor: "#434041",
    borderWidth: 1,
    borderColor: "#696669",
    color: "#f0dddb",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    fontSize: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#36e388",

    borderColor: "#323233",
    borderWidth: 1,
    borderRadius: 20,

    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,

    shadowColor: "#efdddd",
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 5,

    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#323233",
    letterSpacing: 0.5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupForm;
