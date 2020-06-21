import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { CATEGORIES } from "../components/utils/constants";

export default function SettingsScreen() {
  return (
    <View>
      <Button
        title="clear all expense"
        onPress={() => {
          Object.entries(CATEGORIES).forEach(entry => {
            AsyncStorage.setItem(entry[1].key, "");
          });
        }}
      />
    </View>
  );
}
