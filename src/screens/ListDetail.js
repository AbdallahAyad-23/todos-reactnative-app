import { Swipeable } from "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import RightAction from "../components/RightAction";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Create from "../components/Create";
import { Context } from "../context/TodoContext";
const ListDetail = ({ route, navigation }) => {
  const [showCreate, setShowCreate] = useState(false);
  const { _id } = route.params;
  const {
    state: { lists },
    deleteTodo,
    toggleComplete,
    addTodo,
  } = useContext(Context);
  const list = lists.find((list) => list._id === _id);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: list.title,
    });
  }, []);

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#FDFFFC" }}>
      <FlatList
        data={list.todos}
        keyExtractor={(todo) => `${todo._id}`}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <RightAction text="The task was deleted" />
            )}
            onSwipeableRightOpen={() => deleteTodo(item._id, _id)}
          >
            <ListItem
              style={{ marginVertical: 2 }}
              containerStyle={{ backgroundColor: "#FDFFFC", elevation: 1 }}
            >
              <TouchableOpacity onPress={() => toggleComplete(item._id, _id)}>
                <View
                  style={item.complete ? styles.complete : styles.notComplete}
                >
                  {item.complete && (
                    <FontAwesome name="check" size={15} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <ListItem.Content>
                <ListItem.Title style={item.complete && styles.completeTitle}>
                  {item.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Swipeable>
        )}
      />
      <AntDesign
        name="pluscircle"
        color="#005f73"
        onPress={() => setShowCreate(true)}
        style={styles.addBtn}
        size={50}
      />

      {showCreate && (
        <Create
          setShowCreate={setShowCreate}
          placeholder="New todo"
          onSubmit={(item) => addTodo(item, _id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notComplete: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: "#F1D302",
  },

  completeTitle: {
    textDecorationLine: "line-through",
  },
  complete: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: "#F1D302",
    backgroundColor: "#F1D302",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default ListDetail;
