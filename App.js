import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchInput from "./components/SearchInput";
import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";
import { roundHundredth } from "./utils/round";

export default function App() {
  const [location, setLocation] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const errorMessage =
    "Bummer! Couldn't load the weather. Please try a different city.";

  const bindingFn = (text) => {
    setLoading(true);
    setTempLocation(text);
  };

  useEffect(() => {
    setLoading(true);
    setTempLocation("San Francisco");
  }, []);

  useEffect(() => {
    console.log(`loading changed to: ${loading}`);
    if (!loading) return;
    (async function () {
      console.log("entered api call");
      try {
        const locationId = await fetchLocationId(tempLocation);
        const { title, weather, temp } = await fetchWeather(locationId);

        setLocation(title);
        setTemperature(temp);
        setWeatherStatus(weather);
        setError("");
        setLoading(false);
      } catch (err) {
        setError("" + err);
        setLoading(false);
      }
    })();
  }, [loading, tempLocation]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weatherStatus)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              <Text style={[styles.smallText, styles.textStyle]}>
                {error ? errorMessage : null}
              </Text>
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weatherStatus}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {roundHundredth(temperature)}°
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any major city"
                bindingFn={bindingFn}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    ...Platform.select({
      ios: { fontFamily: "AvenirNext-Regular" },
      android: { fontFamily: "Roboto" },
    }),
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});
