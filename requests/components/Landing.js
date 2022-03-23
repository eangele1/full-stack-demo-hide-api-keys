import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DotIndicator } from "react-native-indicators";
import * as Location from "expo-location";

//DEV ONLY: for differentiating between web and mobile API requests
import { IP_ADDR } from "@env";

const Landing = (props) => {
  const [textInput, setTextInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //console.log("Permission to access location was denied");
      return null;
    }

    let coordinates = await Location.getCurrentPositionAsync({});
    return coordinates;
  };

  const getData = async () => {
    try {
      const address =
        Platform.OS == "android" || Platform.OS == "ios"
          ? IP_ADDR
          : "localhost";

      const localeData = await getLocation();
      setLocation(localeData);

      const weatherResponse = await axios.get(
        `http://${address}:5050/api/weather?lat=${
          localeData !== null ? localeData.coords.latitude : 37.7749
        }&lon=${localeData !== null ? localeData.coords.longitude : -122.4194}`
      );
      setWeatherData(weatherResponse.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{ width: 300, height: 80 }}
        source={require("../assets/logo.png")}
      />
      {isLoading && (
        <DotIndicator
          style={{ flex: 0, marginBottom: 20 }}
          size={5}
          count={3}
          color="#B43304"
        />
      )}
      {!isLoading && (
        <View
          style={{
            width: 300,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}.png`,
            }}
          />
          <Text>{location !== null ? "Your Location" : "San Francisco"}</Text>
          <Text>{Math.round(weatherData?.current.temp)}°</Text>
          <View>
            <Text>{Math.round(weatherData?.daily[0].temp.max)}°⬆️</Text>
            <Text>{Math.round(weatherData?.daily[0].temp.min)}°⬇️</Text>
          </View>
        </View>
      )}
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
