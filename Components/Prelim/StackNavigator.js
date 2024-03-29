import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginEmail from "./LoginEmail";
import FlatListEmail from "./FlatListEmail";
import AddEmail from "./AddEmail";
import EditEmail from "./EditEmail";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  const headerRight = () => {
    return (
      <View>
        <Text style={{ marginRight: 30, fontWeight: "500", fontSize: 18 }}>
          ALFORQUE
        </Text>
      </View>
    );
  };

  const headerLeft = () => {
    return (
      <View>
        <Text style={{ marginLeft: 30, fontWeight: "500", fontSize: 18 }}>
          PRELIM
        </Text>
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginEmail">
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => header(),
          }}
          name="LoginEmail"
          component={LoginEmail}
        />
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => header(),
            headerBackVisible: false,
          }}
          name="FlatListEmail"
          component={FlatListEmail}
        />
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => header(),
            headerBackVisible: false,
          }}
          name="AddEmail"
          component={AddEmail}
        />
        <Stack.Screen
          options={{
            headerLeft: () => headerLeft(),
            headerTitle: "",
            headerRight: () => header(),
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
