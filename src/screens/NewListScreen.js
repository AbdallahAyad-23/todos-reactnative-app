import React, { useEffect, useContext, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Context } from "../context/TodoContext";
const NewListScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const { addList } = useContext(Context);

  const addListHandler = () => {
    addList({ title });
    navigation.navigate("Lists");
    setTitle("");
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addListHandler}>
          <Text style={{ marginRight: 15 }}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Input
        placeholder="Enter list title"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={addListHandler}
      />
    </View>
  );
};

export default NewListScreen;
