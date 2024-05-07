import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import client from "./client";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "Username must contain only letters, numbers, and underscores"
    ),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

const LoginForm = ({ navigation }) => {
  const userInfo = {
    username: "",
    password: "",
  };

  const handleLogin = async (values, formikActions) => {
    try {
      const response = await client.post("/login", values);
      if (response.data.success) {
        alert("Login successful");
        formikActions.resetForm();
        navigation.replace("Home", { success: true });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: "10%",
                }}
              >
                Welcome to Login
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Username</Text>
                <Text style={styles.error}>
                  {touched.username && errors.username}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="Username"
              />
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Password</Text>
                <Text style={styles.error}>
                  {touched.password && errors.password}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
              />

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>

                  <AntDesign name="login" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttons, { backgroundColor: "#fce823" }]}
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>

                  <AntDesign name="user" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebdedc",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#fbe0dd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,

    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",

    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#36e388",

    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,

    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,

    shadowColor: "black",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 5,

    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    fontSize: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#323233",
    letterSpacing: 0.5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginForm;
