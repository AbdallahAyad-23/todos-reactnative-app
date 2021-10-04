import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListsScreen from "../screens/ListsScreen";
import ListDetail from "../screens/ListDetail";
const Stack = createStackNavigator();

const ListsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Lists">
      <Stack.Screen
        component={ListsScreen}
        name="Lists"
        options={{ header: () => false }}
      />
      <Stack.Screen
        component={ListDetail}
        name="List"
        options={{ headerStatusBarHeight: 25 }}
      />
    </Stack.Navigator>
  );
};

export default ListsStack;
