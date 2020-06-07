import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAsyncStorage } from "@react-native-community/async-storage";

const KEY = "@to_buy_items";

export default function ToBuyScreen() {
  const [items, setItems] = useState(["item 1"]);
  const [text, setText] = useState("");

  const { getItem, setItem, removeItem } = useAsyncStorage(KEY);

  const readItemFromStorage = async () => {
    const items = await getItem();
    if (items) {
      setItems(items.split(","));
    }
  };

  const writeItemToStorage = async newValue => {
    const items = await getItem();
    if (items) {
      const itemsArr = items.split(",");
      itemsArr.push(newValue);
      await setItem(itemsArr.join());
    } else {
      await setItem(newValue);
      setItems(newValue);
    }
  };

  const clearAll = async () => {
    // why this function is not working?
    try {
      await removeItem();
    } catch (e) {
      // clear error
    }

    console.log("Done.");
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={val => setText(val)}
          value={text}
        />
        <Button
          title="Add"
          onPress={() => {
            writeItemToStorage(text);
            readItemFromStorage();
          }}
        />
      </View>
      {items.map(val => <Item key={val} label={val} />)}
      <Button title="Clear all" onPress={clearAll} />
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
