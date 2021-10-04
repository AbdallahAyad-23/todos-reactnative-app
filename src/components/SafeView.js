import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";

const SafeView = ({ children }) => {
  return <View style={styles.safe}>{children}</View>;
};

export default SafeView;

const styles = StyleSheet.create({
  safe: {
    paddingTop: StatusBar.currentHeight + 40,
    flex: 1,
    backgroundColor: "#FDFFFC",
  },
});
