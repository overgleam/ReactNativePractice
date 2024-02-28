import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const AddStudent = ({ navigation, route }) => {
  const example = require("./images/dog1.gif");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const { Students } = route.params;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addStudent = () => {
    if (name == "") {
      alert("Name is required");
    } else if (image == null) {
      alert("Image is required");
    } else {
      const newKey = Students.length + 1;
      const newStudent = { key: newKey, name: name, image: image };
      Students.push(newStudent);
      setName("");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image
            style={styles.image}
            source={typeof image === "string" ? { uri: image } : example}
          ></Image>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.nameText}>Name: </Text>
        <TextInput
          style={styles.addInput}
          placeholder="Enter name"
          placeholderTextColor={"#f0dddb80"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => addStudent()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: { padding: 50, flex: 1, backgroundColor: "#121013" },
  imageContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#efdddc",
    borderRadius: 20,
  },
  nameText: { fontSize: 20, fontWeight: "bold", color: "#efdddc" },
  addInput: {
    borderColor: "#696669",
    backgroundColor: "#434041",
    color: "#f0dddb",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  saveButton: {
    borderWidth: 0.5,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#66f900",
    borderColor: "#efdddc91",

    shadowColor: "#efdddc",
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  buttonText: { fontSize: 15, fontWeight: "bold", color: "black" },
  deleteButton: {
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: "#efdddc91",
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#fe0000",

    shadowColor: "#efdddc",
    shadowOffset: { width: 3, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
});
