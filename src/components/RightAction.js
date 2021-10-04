import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RightAction = ({ text }) => {
  return (
    <View style={styles.right}>
      <FontAwesome
        name="trash-o"
        size={30}
        color="white"
        style={{ marginHorizontal: 10 }}
      />
      <Text style={{ color: "white" }}>{text}</Text>
    </View>
  );
};

export default RightAction;

const styles = StyleSheet.create({
  right: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#E5383B",
    alignItems: "center",
    margin: 2,
  },
});
