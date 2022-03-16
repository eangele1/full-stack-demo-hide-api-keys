import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await axios.get(
          "http://localhost:5050/api?q=Pandas"
        );
        setArticles(newsResponse.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Text>{articles[0]?.source.id}</Text> */}

      <Text>{articles[0] ? articles[0].source.id : "Loading"}</Text>
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
