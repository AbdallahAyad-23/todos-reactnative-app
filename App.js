import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Provider } from "./src/context/TodoContext";
import PomodoroScreen from "./src/screens/PomodoroScreen";
import ListsStack from "./src/components/ListsStack";

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Lists"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: "#FDFFFC" },
          }}
        >
          <Tab.Screen
            name="ListsStack"
            component={ListsStack}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="home-variant"
                  size={30}
                  color="black"
                />
              ),
              header: () => false,
              tabBarHideOnKeyboard: true,
            }}
          />
          <Tab.Screen
            name="Pomodoro"
            component={PomodoroScreen}
            options={{
              tabBarIcon: () => (
                <AntDesign name="clockcircleo" color="#161A1D" size={30} />
              ),
              header: () => false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
