import { StyleSheet, Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

const Home = ({ navigation, route }) => {
  const { success } = route.params || false;
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    if (success) {
      setLoggedInUser(true);
    } else {
      navigation.navigate("Login");
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Logout"
        onPress={() => {
          setLoggedInUser(false);
          navigation.navigate("Login");
        }}
        color="#841584"
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
