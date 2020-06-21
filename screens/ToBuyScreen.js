import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { TO_BUY_KEY } from "../components/utils/constants";

export default function ToBuyScreen() {
  const [items, setItemsState] = useState();
  const [text, setText] = useState("");

  const { getItem, setItem } = useAsyncStorage(TO_BUY_KEY);

  const readItemFromStorage = async () => {
    const items = await getItem();
    if (items) {
      setItemsState(JSON.parse(items));
    } else {
      setItemsState([]);
    }
  };

  const writeItemToStorage = async newValue => {
    if (newValue.trim() === "") {
      return;
    }
    const items = await getItem();
    if (items) {
      const itemsArr = JSON.parse(items);
      console.log("write items", items);
      itemsArr.push(newValue);
      await setItem(JSON.stringify(itemsArr));
      setItemsState(itemsArr);
    } else {
      await setItem(JSON.stringify([newValue]));
      setItemsState([newValue]);
    }
  };

  const removeItemInStorage = async value => {
    const items = await getItem();
    const itemsArr = JSON.parse(items);
    const index = itemsArr.indexOf(value);
    itemsArr.splice(index, 1);
    await setItem(JSON.stringify(itemsArr));
    setItemsState(itemsArr);
  };

  const clearAll = async () => {
    await setItem("");
    setItemsState([]);
    console.log("Done.");
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const _keyExtractor = val => val;

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
            setText("");
          }}
        />
      </View>
      <SwipeListView
        data={items}
        key="swipe-list"
        keyExtractor={_keyExtractor}
        renderItem={(data, rowMap) =>
          <View style={styles.rowFront}>
            <Text>
              {data.item}
            </Text>
          </View>}
        renderHiddenItem={(data, rowMap) =>
          <View style={{ width: "75px" }}>
            <Button
              title="delete"
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
