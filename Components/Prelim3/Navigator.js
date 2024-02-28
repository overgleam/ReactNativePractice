import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddStudent from "./AddStudent";
import FlatListStudent from "./FlatListStudent";
import React from "react";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  const headerRight = () => {
    return (
      <View>
        <Text style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}>
          ALFORQUE, J
        </Text>
      </View>
    );
  };

  const headerLeft = () => {
    return (
      <View>
        <Text style={{ marginLeft: 30, fontWeight: "500", fontSize: 18 }}>
          PRELIM 3
        </Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlatListStudent">
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => headerRight(),
          }}
          name="FlatListStudent"
          component={FlatListStudent}
        />
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => headerRight(),
            headerBackVisible: false,
          }}
          name="AddStudent"
          component={AddStudent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
