import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import SafeView from "../components/SafeView";
import { FontAwesome5 } from "@expo/vector-icons";
const PomodoroScreen = () => {
  const [state, setState] = useState({
    selected: "regular",
    count: 1,
    min: 0,
    sec: 0,
    playing: false,
  });
  const [countdown, setCountdown] = useState(null);

  const displayTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    if (sec <= 0 && min <= 0) {
      setState((prevState) => ({ ...prevState, count: state.count + 1 }));
      return;
    }
    setState((prevState) => ({ ...prevState, min, sec }));
  };
  const check = () => {
    if (state.count % 8 === 0) {
      setState((prevState) => ({
        ...prevState,
        min: 15,
        sec: 0,
        selected: "Long Break",
        playing: false,
      }));
    } else {
      if (state.count % 2 === 0) {
        setState((prevState) => ({
          ...prevState,
          min: 5,
          sec: 0,
          selected: "Short Break",
          playing: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          min: 25,
          sec: 0,
          selected: "Session",
          playing: false,
        }));
      }
    }
  };
  const timer = () => {
    const seconds = state.min * 60 + state.sec;
    const now = Date.now();
    const then = now + seconds * 1000;
    const counter = setInterval(() => {
      const secondsLeft = (then - Date.now()) / 1000;
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
      displayTime(secondsLeft);
    }, 980);

    setCountdown(counter);
  };
  const start = () => {
    setState((prevState) => ({ ...prevState, playing: true }));
    timer();
  };
  const pause = () => {
    clearInterval(countdown);
    setState((prevState) => ({ ...prevState, playing: false }));
  };
  const reset = () => {
    clearInterval(countdown);
    const selected = state.selected;
    if (state.playing) {
      if (selected === "Session") {
        setState((prevState) => ({
          ...prevState,
          playing: false,
          min: 25,
          sec: 0,
        }));
      } else if (selected === "Long Break") {
        setState((prevState) => ({
          ...prevState,
          playing: false,
          min: 15,
          sec: 0,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          playing: false,
          min: 5,
          sec: 0,
        }));
      }
    }
  };

  useEffect(() => {
    check();
  }, [state.count]);

  return (
    <SafeView>
      <Text h1 style={{ textAlign: "center", color: "#001219" }}>
        Pomodoro
      </Text>
      <View style={styles.container}>
        <View style={styles.pomodoro}>
          <Text style={styles.count}>
            {state.min < 10 ? `0${state.min}` : state.min}:
            {state.sec < 10 ? `0${state.sec}` : state.sec}
          </Text>
          <View style={styles.actions}>
            {state.playing ? (
              <TouchableOpacity onPress={pause}>
                <FontAwesome5 name="pause" size={30} color="#FDFFFC" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={start}>
                <FontAwesome5 name="play" size={30} color="#FDFFFC" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={reset}>
              <FontAwesome5 name="redo" size={30} color="#FDFFFC" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "700",
              fontSize: 30,
              marginTop: 20,
              color: "#FDFFFC",
            }}
          >
            {state.selected}
          </Text>
        </View>
      </View>
    </SafeView>
  );
};

export default PomodoroScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  pomodoro: {
    height: 300,
    width: 300,
    borderRadius: 300 / 2,
    borderWidth: 10,
    borderColor: "#0A9396",
    backgroundColor: "#005F73",
    // marginTop: 70,
    justifyContent: "center",
  },

  count: {
    fontWeight: "700",
    fontSize: 50,
    alignSelf: "center",
    color: "#FDFFFC",
  },
  actions: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly",
    marginHorizontal: 80,
  },
});
