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
    { key: "1", name: "Adolf Hitler", image: require("./images/cat1.jpg") },
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
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 2,
            borderBlockColor: "black",
            borderRadius: 15,
            padding: 15,
          }}
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
            source={student.image ? student.image : { uri: student.image }}
            style={{ height: 100, width: 150, borderRadius: 25 }}
          />
          <Text>{student.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          borderBlockColor: "black",
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            padding: 20,
          }}
          placeholder="Search"
          placeholderTextColor={"black"}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Icon
          name="search"
          size={20}
          color="#aaa"
          style={{
            position: "absolute",
            top: "50%",
            marginTop: -10, // Half of the icon size to vertically center it
            right: 20,
            zIndex: 1,
          }}
        />
      </View>
      <View
        style={{
          borderWidth: 2,
          borderBlockColor: "black",
          borderRadius: 15,
          padding: 20,
          height: "75%",
        }}
      >
        <FlatList
          data={filteredStudents}
          renderItem={({ item }) => <Student student={item} />}
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
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderWidth: 2,
            borderBlockColor: "black",
            borderRadius: 15,
            marginVertical: 20,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("AddStudent", { Students: students })
          }
        >
          <Icon
            style={{ marginRight: 10 }}
            name="plus"
            size={20}
            color="lightgreen"
          />
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListStudent;

const styles = StyleSheet.create({});
