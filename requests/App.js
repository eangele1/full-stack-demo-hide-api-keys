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
        console.log(newsResponse.data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>{articles ? articles : ""}</Text> */}

      <Text>Title: {articles[0]?.title}</Text>
      <Text>Description: {articles[0]?.description}</Text>
      <Text>URL: {articles[0]?.url} </Text>

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
