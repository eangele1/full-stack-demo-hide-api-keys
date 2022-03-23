import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";

const NewsCard = ({ item }) => {
  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  const date = new Date(
    item?.publishedAt.replace(/-/g, "/").replace(/T.+/, "")
  );

  return (
    <Pressable style={styles.container} onPress={handleOpenWithWebBrowser}>
      <Image
        resizeMode="stretch"
        style={{ width: 100, height: 100, marginRight: 10 }}
        source={{
          uri: item?.urlToImage,
        }}
      />
      <View style={{ width: 250, height: 90 }}>
        <Text numberOfLines={2} style={{ fontWeight: "bold", flex: 1 }}>
          {item?.title}
        </Text>
        <Text style={{ fontStyle: "italic" }}>
          {item?.source.name} –{" "}
          {date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear()}
        </Text>
        <Text numberOfLines={2} style={{ flex: 1 }}>
          {item?.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default NewsCard;
