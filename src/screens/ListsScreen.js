import React, { useContext, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { ListItem, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import SafeView from "../components/SafeView";
import RightAction from "../components/RightAction";
import Create from "../components/Create";
import { Context } from "../context/TodoContext";
const ListsScreen = ({ navigation }) => {
  const [showCreate, setShowCreate] = useState(false);

  const {
    state: { lists },
    deleteList,
    addList,
  } = useContext(Context);
  return (
    <SafeView>
      <Text h1 style={{ textAlign: "center", marginBottom: 10 }}>
        Tasks <Text>Lists</Text>
      </Text>
      <FlatList
        data={lists}
        keyExtractor={(list) => `${list._id}`}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <RightAction text="The list was deleted" />
            )}
            onSwipeableRightOpen={() => deleteList(item._id)}
          >
            <ListItem
              style={{ marginVertical: 2 }}
              containerStyle={{
                backgroundColor: "#FDFFFC",
                elevation: 1,
              }}
              onPress={() => navigation.navigate("List", { _id: item._id })}
            >
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
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
          placeholder="New list"
          onSubmit={(item) => addList(item)}
        />
      )}
    </SafeView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
