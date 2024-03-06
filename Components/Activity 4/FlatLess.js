import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "./Database";
const FlatLess = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUsers();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (_, { rows }) => {
          let users = [];
          for (let i = 0; i < rows.length; i++) {
            users.push({
              key: rows.item(i).id.toString(),
              username: rows.item(i).username,
              email: rows.item(i).email,
              password: rows.item(i).password,
            });
          }
          setUser(users);
        },
        (error) => console.log("Error fetching users: ", error)
      );
    });
  };

  const [users, setUser] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredUsers = users.filter((user) => {
    return user.username.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const deleteUser = (key) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM users WHERE id = ?",
          [key],
          () => {
            console.log("User deleted successfully");
            onRefresh();
          },
          (error) => console.log("Error deleting user: ", error)
        );
      },
      (error) => console.log("Error deleting user: ", error)
    );
  };

  const editUser = (key) => {};

  const User = ({ user }) => {
    return (
      <View>
        <Pressable
          style={({ pressed }) => [
            styles.userContainer,
            {
              top: pressed ? 4 : 0,
              left: pressed ? 4 : 0,
            },
          ]}
          onPress={() =>
            Alert.alert(
              "User Information",
              `Username: ${user.username}\nEmail: ${user.email}\nPassword: ${user.password}`
            )
          }
          onLongPress={() =>
            Alert.alert("Delete", `Are you sure to delete ${user.username}?`, [
              {
                text: "Yes",
                onPress: () => deleteUser(user.key),
                style: "destructive",
              },
              { text: "No", style: "cancel" },
            ])
          }
        >
          <Text style={styles.userName}>{user.username}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#f0dddb80"}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <MaterialCommunityIcons
          name="account-search"
          size={20}
          color="#f0dddb"
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", color: "#eededd" }}>
              No students found
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            {
              top: pressed ? 4 : 0,
              left: pressed ? 4 : 0,
              shadowOpacity: pressed ? 0 : 1,
              backgroundColor: pressed ? "lightgreen" : "#efdddd",
            },
          ]}
          onPress={() => navigation.navigate("Add")}
        >
          <MaterialCommunityIcons
            style={styles.addIcon}
            name="account-plus"
            size={20}
            color="green"
          />
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
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
            style={styles.deleteIcon}
            name="logout"
            size={20}
            color="red"
          />
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FlatLess;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121013", padding: 20 },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    fontFamily: "CabinetGrotesk-Medium",

    backgroundColor: "#434041",
    borderWidth: 1,
    borderColor: "#696669",
    color: "#f0dddb",
    borderRadius: 15,
    flex: 1,
    padding: 20,
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    marginTop: -10, // Half of the icon size to vertically center it
    right: 20,
    zIndex: 1,
  },
  flatListContainer: {
    backgroundColor: "#1e2022",
    borderWidth: 1.5,
    borderColor: "#323134",
    borderRadius: 15,
    padding: 20,
    height: "75%",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#f0dddb80",
    shadowOffset: { width: 4, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,

    backgroundColor: "#efdddd",
    borderWidth: 1.5,
    borderBlockColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    padding: 20,
    marginHorizontal: 10,
  },
  addIcon: {
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
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
    marginVertical: 20,
    padding: 20,
    marginHorizontal: 10,
  },
  deleteIcon: {
    marginRight: 10,
  },
  userContainer: {
    backgroundColor: "#1e2022",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2e2e30",
    borderRadius: 15,
    padding: 15,
  },
  userName: {
    fontSize: 18,
    color: "#eededd",
    fontSize: 24,
    paddingLeft: 20,
    fontFamily: "CabinetGrotesk-Medium",
  },
  buttonText: {
    textAlign: "center",
    color: "#323233",
    letterSpacing: 0.5,
    color: "black",
    fontSize: 16,
    fontFamily: "CabinetGrotesk-Bold",
  },
});
