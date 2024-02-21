import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import Email from "./Emails.json";

const FlatListEmail = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState(Email);

  const filterEmail = email.filter((e) => {
    return e.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const deleteEmail = (user) => {
    setEmail(email.filter((e) => e.key !== user.key));
  };

  const editEmail = (user) => {
    navigation.navigate("EditEmail", {
      user: user,
      email: email,
    });
  };

  const Item = ({ user }) => {
    const handleEdit = () => {
      Alert.alert(
        "User Information",
        `Key: ${user.key}\nEmail: ${user.email}\nPassword: ${user.password}`,
        [
          {
            text: "Edit",
            onPress: () => editEmail(user),
            style: "default",
            isPreferred: true,
          },
          {
            text: "Delete",
            onPress: () => deleteEmail(user),
            style: "destructive",
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    };

    const handlePress = () => {
      Alert.alert(
        "User Information",
        `Key: ${user.key}\nEmail: ${user.email}\nPassword: ${user.password}`
      );
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onLongPress={handleEdit}
          onPress={handlePress}
        >
          <Text style={{ textAlign: "center" }}>{user.email}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor="#835579"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={filterEmail}
            renderItem={({ item }) => <Item user={item} />}
            keyExtractor={(item) => item.key}
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
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddEmail", { email: email })}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: "red",
                alignSelf: "center",
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "white",
                marginHorizontal: 10,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlatListEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a7e8",

    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  todoContainer: {
    flex: 1,
    backgroundColor: "#f3ebea",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,

    shadowColor: "black",
    shadowOffset: { height: 7, width: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  searchContainer: {
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#fbe0dd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    width: 0,

    marginRight: 10,
  },
  addButton: {
    backgroundColor: "lightgreen",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    paddingHorizontal: 12,
    paddingVertical: 10,

    textAlign: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#ebdedc",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    marginTop: 20,
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
});
