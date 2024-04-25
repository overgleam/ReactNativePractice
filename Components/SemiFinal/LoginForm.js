import React, { useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
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
    .min(6, "Password must be at least 6 characters"),
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
        navigation.navigate("Home", { success: true });
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
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Username</Text>
              <Text style={styles.error}>
                {touched.username && errors.username}
              </Text>
            </View>
            <TextInput
              style={styles.input}
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

            <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
              <Text>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttons}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text>Signup</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default LoginForm;
