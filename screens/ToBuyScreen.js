import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";

const KEY = "@to_buy_items";
// TODO: reflect the items after adding and removing

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

  const removeItemInStorage = async value => {
    const items = await getItem();
    const itemsArr = items.split(",");
    const index = itemsArr.indexOf(value);
    itemsArr.splice(index, 1);
    await setItem(itemsArr.join());
  };

  const clearAll = async () => {
    await setItem("");
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
      <SwipeListView
        data={items}
        key="swipe-list"
        renderItem={(data, rowMap) =>
          <View key={data.item} style={styles.rowFront}>
            <View>
              <Text>
                {data.item}
              </Text>
            </View>
          </View>}
        renderHiddenItem={(data, rowMap) =>
          <View style={{ width: "75px" }}>
            <Button
              title="delete"
              key={`delete-${data.item}`}
              onPress={() => {
                console.log("delete", data.item);
                removeItemInStorage(data.item);
              }}
            />
          </View>}
        leftOpenValue={75}
      />
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
  },
  rowFront: {
    backgroundColor: "white",
    height: "40px"
  }
});
