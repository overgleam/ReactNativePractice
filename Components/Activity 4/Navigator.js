import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Add from "./Add";
import FlatLess from "./FlatLess";
import Login from "./Login";
import Edit from "./EditUser";
import { Text, View, StyleSheet } from "react-native";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerLeft: () => (
            <View>
              <Text
                style={{
                  marginLeft: 30,
                  fontWeight: "500",
                  fontSize: 18,
                  fontFamily: "CabinetGrotesk-Bold",
                }}
              >
                Activity 4
              </Text>
            </View>
          ),
          headerRight: () => (
            <View>
              <Text
                style={{
                  marginRight: 30,
                  fontWeight: "500",
                  fontSize: 18,
                  fontFamily: "CabinetGrotesk-Bold",
                }}
              >
                Joseph Alforque
              </Text>
            </View>
          ),
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: "#ffa31a",
            },
          }}
          name="FlatLess"
          component={FlatLess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
