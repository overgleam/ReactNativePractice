import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "./client";

const Home = ({ navigation, route }) => {
  const { success } = route.params || { success: false };
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (success) {
      onRefresh();
    } else {
      navigation.navigate("Login");
    }
  }, [navigation, success]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      apiCall();
      setRefreshing(false);
    }, 2000);
  };

  const apiCall = async () => {
    try {
      const response = await client.get("/users");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Item = ({ user }) => {
    const handlePress = () => {
      Alert.alert(
        "User Information",
        `Key: ${user.id}\nEmail: ${user.email}\nPassword: ${user.password}`
      );
    };
    return (
      <View>
        <TouchableOpacity style={styles.item} onPress={handlePress}>
          <Text style={{ textAlign: "center" }}>{user.email}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
        Welcome to Home
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item user={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No students found</Text>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          {
            top: pressed ? 4 : 0,
            left: pressed ? 4 : 0,
            shadowOpacity: pressed ? 0 : 1,
            backgroundColor: pressed ? "#FF474C" : "#efdddd",
          },
        ]}
        onPress={() => navigation.navigate("Login")}
      >
        <MaterialCommunityIcons
          style={styles.logoutIcon}
          name="logout"
          size={20}
          color="red"
        />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebea",
  },
  listContainer: {
    height: "80%",
    backgroundColor: "#ebdedc",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    margin: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#fcc128",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    paddingVertical: 14,
    marginHorizontal: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f0dddb80",
    shadowOffset: { width: 4, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,

    backgroundColor: "#efdddd",
    borderWidth: 1.5,
    borderBlockColor: "black",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
  logoutIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "red",
    fontSize: 16,
  },
});
