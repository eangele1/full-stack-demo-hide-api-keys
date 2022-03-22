import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const Landing = (props) => {
  const [textInput, setTextInput] = useState("");

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{ width: 300, height: 100 }}
        source={require("../assets/logo.png")}
      />
      <TextInput
        style={{
          width: 300,
          height: 50,
          padding: 15,
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 50,
        }}
        placeholder="Search"
        value={textInput}
        onChangeText={setTextInput}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (textInput !== "") {
            const text = textInput;
            setTextInput("");
            props.navigation.navigate("Results", { input: text });
          }
        }}
      >
        <Text style={styles.buttonText}>ROAR!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#B43304",
    padding: 10,
    borderRadius: 20,
    width: 150,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});

export default Landing;
