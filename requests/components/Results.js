import { View, FlatList, Platform, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DotIndicator } from "react-native-indicators";

//DEV ONLY: for differentiating between web and mobile API requests
import { IP_ADDR } from "@env";
import NewsCard from "./NewsCard";

const Results = (props) => {
  const { input } = props.route.params;

  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState(input);

  const getData = async (input) => {
    setLoading(true);
    try {
      const address =
        Platform.OS == "android" || Platform.OS == "ios"
          ? IP_ADDR
          : "localhost";
      const newsResponse = await axios.get(
        `http://${address}:5050/api/news?q=${input}`
      );
      setArticles(newsResponse.data.articles);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(input);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          padding: 5,
          borderColor: "black",
          borderWidth: 1,
        }}
        placeholder="Search"
        value={textInput}
        onChangeText={setTextInput}
        onSubmitEditing={() => textInput !== "" && getData(textInput)}
      ></TextInput>

      {isLoading && (
        <DotIndicator
          style={{ flex: 0, marginTop: 20 }}
          size={10}
          count={3}
          color="#B43304"
        />
      )}
      {!isLoading && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={articles}
            renderItem={NewsCard}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Results;
