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
    if (name == "" || image == null) {
      alert("Name and Image is required");
    } else {
      const newKey = Students.length + 1;
      const newStudent = { key: newKey, name: name, image: image };
      Students.push(newStudent);
      setName("");
      navigation.goBack();
    }
  };

  return (
    <View style={{ margin: 50, flex: 1 }}>
      <View>
        <TouchableOpacity style={{ marginBottom: 20 }} onPress={pickImage}>
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: "cover",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 50,
            }}
            source={{ uri: image }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name: </Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 15,
            padding: 20,
            marginVertical: 20,
          }}
          placeholder="Enter name"
          placeholderTextColor={"black"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: "lightgreen",
          }}
          onPress={() => addStudent()}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: "red",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({});
