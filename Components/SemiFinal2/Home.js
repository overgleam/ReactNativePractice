import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import client from "./client";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      apiCall();
      setRefreshing(false);
    }, 2000);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // const filteredData = data.filter((student) =>
  //   student.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const apiCall = async () => {
    try {
      const response = await client.get("/getstudents");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Item = ({ student }) => {
    const handlePress = () => {
      Alert.alert(
        "User Information",
        `ID: ${student.idno}\n First name: ${student.firstname}\n Last name: ${student.lastname}\n Course: ${student.course}\n Year level: ${student.level},`
      );
    };

    const path = student.picture_path;
    console.log(path);
    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            styles.item,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#fcc128",
            },
          ]}
        >
          <Image
            source={
              student.picture_path
                ? require("./images/cat1.gif")
                : { uri: "https://picsum.photos/200" }
            }
            style={{
              width: 50,
              height: 50,
              borderWidth: 0.5,
              borderRadius: 50,
            }}
          />
          <Text>{student.lastname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
        Welcome to Home
      </Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#835579"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />

        <MaterialCommunityIcons name="magnify" size={24} color="#835579" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item student={item} />}
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fbe0dd",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,

    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
});
