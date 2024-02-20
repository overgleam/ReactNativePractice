import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginEmail from "./LoginEmail";
import FlatListEmail from "./FlatListEmail";
import AddEmail from "./AddEmail";
import EditEmail from "./EditEmail";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginEmail">
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => (
              <Text
                style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}
              >
                ALFORQUE
              </Text>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              marginLeft: 10, // Adjust this value as needed
            },
          }}
          name="LoginEmail"
          component={LoginEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => (
              <Text
                style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}
              >
                ALFORQUE
              </Text>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              marginLeft: 10, // Adjust this value as needed
            },
            headerLeft: null,
          }}
          name="FlatListEmail"
          component={FlatListEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => (
              <Text
                style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}
              >
                ALFORQUE
              </Text>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              marginLeft: 10, // Adjust this value as needed
            },
          }}
          name="AddEmail"
          component={AddEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => (
              <Text
                style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}
              >
                ALFORQUE
              </Text>
            ),
            headerTitleAlign: "left",
            headerTitleStyle: {
              marginLeft: 10, // Adjust this value as needed
            },
          }}
          name="EditEmail"
          component={EditEmail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
