import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";

export default function ToBuyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Item label="buy this" />
      <Item label="buy that" />
      <Item label="buy another" />
    </ScrollView>
  );
}

const Item = ({ label }) =>
  <View style={{ flexDirection: "row" }}>
    <Text style={styles.optionText}>
      {label}
    </Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});
