import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
const Create = ({ setShowCreate, onSubmit, placeholder }) => {
  const [title, setTitle] = useState("");
  const onEndEditingHandler = () => {
    onSubmit({ title, _id: Math.floor(Math.random() * 9999) });
    setTitle("");
    setShowCreate(false);
  };
  return (
    <View style={styles.create}>
      <FontAwesome
        onPress={() => setShowCreate(false)}
        name="close"
        size={25}
        color="#C1292E"
        style={{
          alignSelf: "flex-end",
          marginRight: 4,
          marginTop: 4,
        }}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={onEndEditingHandler}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  create: {
    margin: 10,
    backgroundColor: "#FDFFFC",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    elevation: 3,
  },
  input: {
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
});
