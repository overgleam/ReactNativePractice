import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";

const TodoList = () => {
  const [student, setStudent] = useState([
    { key: "1", name: "Joseph Alforque", course: "BSCS", level: "1" },
    { key: "2", name: "Dennis Durano", course: "BSCE", level: "2" },
    { key: "3", name: "Nonito Odjinar", course: "BSCS", level: "3" },
    { key: "4", name: "Heubert Ferolino", course: "BSCS", level: "4" },
    { key: "5", name: "Neil Basabe", course: "BSCS", level: "5" },
    { key: "6", name: "Homer Bustrillo", course: "BSBA", level: "6" },
    { key: "7", name: "Jennifer Amores", course: "BSA", level: "7" },
    { key: "8", name: "Leah Ybañez", course: "BSHM", level: "8" },
    { key: "9", name: "Jeff Salimbangon", course: "BSCE", level: "9" },
    { key: "10", name: "Eric Ortega", course: "BSHRM", level: "10" },
    { key: "11", name: "Leo Bermudez", course: "BSBO", level: "11" },
    { key: "12", name: "ChatGPT", course: "All", level: "God" },
  ]);
  const [filteredStudent, setFilteredStudent] = useState(student);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const Item = ({ student }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleAlert(student)}
        >
          <Text
            style={{
              color: "#2b2f33",
              marginLeft: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {student.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  function handleAlert(student) {
    Alert.alert(
      "Student Information",
      `Key: ${student.key}\nName: ${student.name}\nCourse: ${student.course}\nLevel: ${student.level}`
    );
  }

  function handleSearch() {
    if (searchQuery) {
      let newData = student.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.level.toLowerCase().includes(searchQuery)
      );
      setFilteredStudent(newData);
      setSearching(true);
      Keyboard.dismiss();
    }
  }
  function handleCancelSearch() {
    setSearchQuery("");
    setFilteredStudent(student);
    setSearching(false);
    Keyboard.dismiss();
  }

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
          {searching ? (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => handleCancelSearch()}
            >
              <Text style={styles.searchText}>Cancel</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => handleSearch()}
            >
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={filteredStudent}
            renderItem={({ item }) => <Item student={item} />}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: "center" }}>No students found</Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a7e8",
    justifyContent: "center",

    padding: 20,
  },
  todoContainer: {
    backgroundColor: "#f3ebea",
    height: 600,
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

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#f7b302",
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
  searchText: {
    color: "#2b2f33",
  },
  listContainer: {
    backgroundColor: "#ebdedc",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    height: 489,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#fce823",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    padding: 10,
    margin: 5,
  },
});
