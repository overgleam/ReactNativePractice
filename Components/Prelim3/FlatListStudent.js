import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

const FlatListStudent = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);

  const [students, setStudents] = useState([
    { key: "1", name: "Adolf Hitler", image: require("./images/cat1.gif") },
    { key: "2", name: "Korea", image: require("./images/cat2.jpg") },
    { key: "3", name: "Japan", image: require("./images/cat3.jpg") },
    { key: "4", name: "Taiwan", image: require("./images/cat4.jpg") },
    { key: "5", name: "China", image: require("./images/cat5.jpg") },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const deleteStudent = (key) => {
    setStudents((students) => {
      return students.filter((student) => student.key != key);
    });
  };
  const Student = ({ student }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.studentContainer}
          onPress={() => Alert.alert("Student", student.name)}
          onLongPress={() =>
            Alert.alert("Delete", `Are you sure to delete ${student.name}?`, [
              {
                text: "Yes",
                onPress: () => deleteStudent(student.key),
                style: "destructive",
              },
              { text: "No", style: "cancel" },
            ])
          }
        >
          <Image
            source={
              typeof student.image === "string"
                ? { uri: student.image }
                : student.image
            }
            style={styles.image}
          />
          <Text style={styles.studentName}>{student.name}</Text>
        </TouchableOpacity>
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
        <Icon
          name="search"
          size={20}
          color="#f0dddb"
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredStudents}
          renderItem={({ item }) => <Student student={item} />}
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
      <View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddStudent", { Students: students })
          }
        >
          <Icon
            style={styles.addIcon}
            name="plus"
            size={20}
            color="lightgreen"
          />
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListStudent;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121013", padding: 20 },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
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
  addButton: {
    shadowColor: "#f0dddb80",
    shadowOffset: { width: 4, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,

    backgroundColor: "#efdddd",
    flexDirection: "row",
    borderWidth: 1,
    borderBlockColor: "black",
    borderRadius: 15,
    marginVertical: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    marginRight: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: "contain",
  },
  studentContainer: {
    backgroundColor: "#1e2022",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2e2e30",
    borderRadius: 15,
    padding: 15,
  },
  studentName: { flex: 1, textAlign: "center", fontSize: 18, color: "#eededd" },
  addText: { fontWeight: "bold", color: "#323233" },
});
