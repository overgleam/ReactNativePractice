import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { tweets } from "./data";

const Home = () => {
  const [data, setData] = useState(tweets);
  const Item = ({ item }) => {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          flexDirection: "row",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={() => alert(`id: ${item.id}`)}>
            <Image
              source={{ uri: item.author.avatar }}
              style={{
                resizeMode: "cover",
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text>{item.author.name}</Text>
            <Text>@{item.author.screenName}</Text>
          </View>
          <Text>{item.fullText}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 20,
              marginTop: 10,
            }}
          >
            <AntDesign name="message1" size={20} color="black" />
            <Text>{item.replyCount}</Text>
            <AntDesign name="retweet" size={20} color="black" />
            <Text>{item.retweetCount}</Text>
            <AntDesign name="heart" size={20} color="black" />
            <Text>{item.favoriteCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <Item item={item} />;
      }}
      ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
