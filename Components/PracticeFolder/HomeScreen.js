import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { useState } from "react";

const HomeScreen = () => {
  useEffect(() => {
    console.log("HomeScreen mounted");
  });

  const navigation = useNavigation();
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>{countRef.current}</Text>
      <Button
        title="Increment"
        onPress={() => {
          countRef.current++;
          console.log(countRef.current);
        }}
      />
      <Button title={`Go to Details Screen ${count}`} onPress={increment} />
    </View>
  );
};

export default HomeScreen;
