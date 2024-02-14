import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Keyboard,
  Pressable,
  RefreshControl,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import students from "./students.json";

const TodoList = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
  });
  const [student, setStudent] = useState(students);
  const [filteredStudent, setFilteredStudent] = useState(student);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [onPress, setOnPress] = useState(false);
  const [onPressAdd, setOnPressAdd] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [addStudent, setAddStudent] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  }, [dimensions]);

  const { window } = dimensions;
  const windowHeight = window.height;

  const deleteStudent = (studentKey) => {
    const updatedStudent = student.filter((s) => s.key !== studentKey.key);
    setStudent(updatedStudent);
    setFilteredStudent(updatedStudent);

    setSearchQuery("");
    setSearching(false);
    Alert.alert("Student Deleted");
  };

  const editStudent = (s) => {
    setEditingStudent(s);
    setModalIsVisible(true);
  };

  const [editingStudent, setEditingStudent] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedCourse, setEditedCourse] = useState("");
  const [editedLevel, setEditedLevel] = useState("");

  const handleEditStudent = () => {
    // Find the index of the editing student in the list
    const index = student.findIndex((s) => s.key === editingStudent.key);
    if (index !== -1) {
      if (editedName && editedCourse && editedLevel) {
        // Create a copy of the original student list
        const updatedStudentList = [...student];
        // Update the student data with the edited values
        updatedStudentList[index] = {
          ...editingStudent,
          name: editedName,
          course: editedCourse,
          level: editedLevel,
        };
        // Update the state with the new student list
        setStudent(updatedStudentList);
        setFilteredStudent(updatedStudentList);
        // Close the modal
        setModalIsVisible(false);
        // Reset the editing fields
        setEditingStudent(null);
        setEditedName("");
        setEditedCourse("");
        setEditedLevel("");

        setSearchQuery("");
        setSearching(false);
        // Show success message
        Alert.alert("Student Updated Successfully");
      } else {
        Alert.alert("Fill all fields!");
      }
    }
  };

  function handleAdd() {
    setAddStudent(true);
    setModalIsVisible(true);
  }

  function handleAddStudent() {
    if (editedName && editedCourse && editedLevel) {
      const maxKey = student.reduce(
        (max, s) => Math.max(max, parseInt(s.key)),
        0
      );
      // Increment the maximum key value by 1 for the new item
      const newKey = (maxKey + 1).toString();

      const newItem = {
        key: newKey,
        name: editedName,
        course: editedCourse,
        level: editedLevel,
      };

      setStudent((f) => [...f, newItem]);
      setFilteredStudent((a) => [...a, newItem]);
      setEditedName("");
      setEditedCourse("");
      setEditedLevel("");
      setAddStudent(false);
      setModalIsVisible(false);
      Alert.alert("Student Added Successfully");
    } else {
      Alert.alert("Fill all fields!");
    }
  }

  const Item = ({ student }) => {
    const [pressStudent, setPressStudent] = useState(null);

    const handleEdit = () => {
      Alert.alert(
        "Student Information",
        `Key: ${student.key}\nName: ${student.name}\nCourse: ${student.course}\nLevel: ${student.level}`,
        [
          {
            text: "Edit",
            onPress: () => editStudent(student),
            style: "default",
            isPreferred: true,
          },
          {
            text: "Delete",
            onPress: () => deleteStudent(student),
            style: "destructive",
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    };

    return (
      <View>
        <Pressable
          style={pressStudent === student.key ? styles.itemActive : styles.item}
          onPressIn={() => setPressStudent(student.key)}
          onPressOut={() => setPressStudent(null)}
          onLongPress={() => handleEdit()}
          onPress={() => handleAlert(student)}
        >
          <Text
            style={{
              color: "#2b2f33",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {student.name}
          </Text>
        </Pressable>
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Refresh indicator will be visible for at least 1 second
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.textInput, isFocused && styles.textInputActive]}
            placeholder="Search"
            placeholderTextColor="#835579"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={searching ? false : true}
            selectable={searching ? false : true}
          />
          {searching ? (
            <Pressable
              style={onPress ? styles.searchButtonActive : styles.searchButton}
              onPressIn={() => setOnPress(true)}
              onPressOut={() => setOnPress(false)}
              onPress={() => handleCancelSearch()}
            >
              <Text style={styles.searchText}>Cancel</Text>
            </Pressable>
          ) : (
            <Pressable
              style={onPress ? styles.searchButtonActive : styles.searchButton}
              onPressIn={() => setOnPress(true)}
              onPressOut={() => setOnPress(false)}
              onPress={() => handleSearch()}
            >
              <Text style={styles.searchText}>Search</Text>
            </Pressable>
          )}
          <Pressable
            style={onPressAdd ? styles.addButtonActive : styles.addButton}
            onPressIn={() => setOnPressAdd(true)}
            onPressOut={() => setOnPressAdd(false)}
            onPress={() => handleAdd()}
          >
            <Text style={styles.searchText}>Add</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.listContainer,
            { height: windowHeight > 500 ? "90%" : "80%" },
          ]}
        >
          <FlatList
            data={filteredStudent}
            renderItem={({ item }) => <Item student={item} />}
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
      </View>
      <Modal
        visible={modalIsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalIsVisible(false)}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: "50%",
            backgroundColor: "#f3ebea",
          }}
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                flex: 1,
                marginTop: 100,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#1ead82" }]
                    : styles.modalTextInput
                }
                placeholder="Name"
                value={editedName}
                onChangeText={setEditedName}
              />
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#1ead82" }]
                    : styles.modalTextInput
                }
                placeholder="Course"
                value={editedCourse}
                onChangeText={setEditedCourse}
              />
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#1ead82" }]
                    : styles.modalTextInput
                }
                placeholder="Level"
                value={editedLevel}
                onChangeText={setEditedLevel}
              />
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                  width: "50%",
                }}
              >
                <TouchableOpacity
                  style={styles.modalButton1}
                  onPress={addStudent ? handleAddStudent : handleEditStudent}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton2}
                  onPress={() => {
                    setAddStudent(false);
                    setModalIsVisible(false);
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a7e8",
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  todoContainer: {
    backgroundColor: "#f3ebea",
    height: "80%",
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
  textInputActive: {
    shadowColor: "black",
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
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
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  searchButtonActive: {
    backgroundColor: "#f7b302",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    top: 3,
    left: 4,
    shadowOpacity: 0,

    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  searchText: {
    color: "#2b2f33",
  },
  addButton: {
    backgroundColor: "#fd84e3",
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
  addButtonActive: {
    backgroundColor: "#dcb247",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    top: 3,
    left: 4,
    shadowOpacity: 0,

    paddingHorizontal: 12,
    paddingVertical: 10,

    textAlign: "center",
    justifyContent: "center",
  },
  listContainer: {
    backgroundColor: "#ebdedc",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    height: 500 ? "80%" : "90%",
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
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    paddingVertical: 14,
    marginHorizontal: 5,
  },
  itemActive: {
    backgroundColor: "#fce823",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    top: 4,
    left: 5,

    shadowOpacity: 0,

    paddingVertical: 14,
    marginHorizontal: 5,
  },

  modalContainer: {
    flex: 1,
  },
  modalTextInput: {
    backgroundColor: "#fbe0dd",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "black",
    shadowOffset: { height: 4, width: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,

    paddingHorizontal: 25,
    paddingVertical: 15,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  modalButton1: {
    backgroundColor: "#f7b302",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
  },
  modalButton2: {
    backgroundColor: "#fd84e3",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: { height: 3, width: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,

    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 10,
  },
});
