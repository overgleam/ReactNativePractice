import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
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
    .min(6, "Password must be at least 6 characters"),
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
        navigation.navigate("Home", { success: true });
      } else {
        alert(response.data.message);
      }

      console.log(response.data);
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
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Username</Text>
                <Text style={styles.error}>
                  {touched.username && errors.username}
                </Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
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
                onBlur={handleBlur("email")}
                value={email}
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
                secureTextEntry
                value={confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
              />

              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: "lightblue" }]}
                onPress={handleSubmit}
              >
                <Text>Signup</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => navigation.goBack()}
              >
                <Text>Go Back</Text>
              </TouchableOpacity>
            </>
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
    backgroundColor: "red",
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

export default SignupForm;
