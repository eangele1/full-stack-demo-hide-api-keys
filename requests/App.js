import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  useEffect(async () => {
    try {
      const newsResponse = await axios.get(
        "http://localhost:5050/api?q=Pandas"
      );
      console.log(newsResponse);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
