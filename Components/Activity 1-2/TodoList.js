import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  RefreshControl,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import students from "./students.json";

const TodoList = () => {
  const [student, setStudent] = useState(students);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedCourse, setEditedCourse] = useState("");
  const [editedLevel, setEditedLevel] = useState("");

  const clearFields = () => {
    setEditedName("");
    setEditedCourse("");
    setEditedLevel("");
  };

  const editStudent = (s) => {
    setEditingStudent(s);
    setModalIsVisible(true);
  };

  const handleEditStudent = () => {
    if (editedName && editedCourse && editedLevel) {
      const updatedStudent = student.map((s) => {
        if (s.key === editingStudent.key) {
          s.name = editedName;
          s.course = editedCourse;
          s.level = editedLevel;
        }
        return s;
      });
      setStudent(updatedStudent);
      setModalIsVisible(false);
      setEditingStudent(null);
      Alert.alert("Student Updated Successfully");
    } else {
      Alert.alert("Fill all fields!");
    }
  };

  const deleteStudent = (studentKey) => {
    const updatedStudent = student.filter((s) => s.key !== studentKey.key);
    setStudent(updatedStudent);
    Alert.alert(
      "Student Deleted Successfully",
      `Key: ${studentKey.key}\nName: ${studentKey.name}\nCourse: ${studentKey.course}\nLevel: ${studentKey.level}`
    );
  };

  function handleAdd() {
    setModalIsVisible(true);
    setAddStudent(true);
  }

  function handleAddStudent() {
    if (!editedName || !editedCourse || !editedLevel) {
      Alert.alert("Fill all fields!");
      return;
    }

    const maxKey = Math.max(...student.map((s) => parseInt(s.key)), 0);
    const newKey = (maxKey + 1).toString();

    const newItem = {
      key: newKey,
      name: editedName,
      course: editedCourse,
      level: editedLevel,
    };

    setStudent((prevStudents) => [...prevStudents, newItem]);

    clearFields();

    setAddStudent(false);
    setModalIsVisible(false);
    Alert.alert("Student Added Successfully");
  }

  const Item = ({ student }) => {
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

    const handlePress = () => {
      Alert.alert(
        "Student Information",
        `Key: ${student.key}\nName: ${student.name}\nCourse: ${student.course}\nLevel: ${student.level}`
      );
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onLongPress={handleEdit}
          onPress={handlePress}
        >
          <Text style={{ textAlign: "center" }}>{student.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const filteredStudent = student.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.level.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor="#835579"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAdd()}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={<View style={{ height: 20 }}></View>}
          />
        </View>
      </View>
      <Modal
        visible={modalIsVisible}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => {
          clearFields();
          setEditingStudent(null);
          setAddStudent(false);
          setModalIsVisible(false);
        }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={{
            flex: 1,
            backgroundColor: "#ebdedc",
          }}
        >
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
                lineHeight: 30,
              }}
            >
              {editingStudent
                ? `Editing :
${editingStudent.name}
${editingStudent.course}
${editingStudent.level}`
                : "Adding Student"}
            </Text>
            <View>
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#ebdedc" }]
                    : styles.modalTextInput
                }
                placeholder="Name"
                value={editedName}
                onChangeText={setEditedName}
              />
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#ebdedc" }]
                    : styles.modalTextInput
                }
                placeholder="Course"
                value={editedCourse}
                onChangeText={setEditedCourse}
              />
              <TextInput
                style={
                  addStudent
                    ? [styles.modalTextInput, { backgroundColor: "#ebdedc" }]
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
                    clearFields();
                    setEditingStudent(null);
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
    backgroundColor: "#2c3034",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
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
