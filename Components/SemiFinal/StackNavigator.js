import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
