import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchInput = ({ placeholder, bindingFn }) => {
  const [input, setInput] = useState("San Francisco");
  const handleInput = (text) => setInput(text);
  const handleSubmit = () => {
    if (!input) {
      return;
    }
    bindingFn(input);
    setInput("");
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleInput}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
});

export default SearchInput;
