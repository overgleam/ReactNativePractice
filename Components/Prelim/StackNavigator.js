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

  const header = () => {
    return (
      <View>
        <Text style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}>
          ALFORQUE
        </Text>
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginEmail">
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => header(),
          }}
          name="LoginEmail"
          component={LoginEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => header(),
            headerBackVisible: false,
          }}
          name="FlatListEmail"
          component={FlatListEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerRight: () => header(),
            headerBackVisible: false,
          }}
          name="AddEmail"
          component={AddEmail}
        />
        <Stack.Screen
          options={{
            title: "PRELIM",
            headerBackVisible: false,
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
