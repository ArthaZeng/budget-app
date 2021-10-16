import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const save = async content => {
  const { money, note } = content;
  try {
    const values = await AsyncStorage.getItem(content.key);
    if (values != null && values !== "") {
      console.log("did you store it?", values);
      const currValues = JSON.parse(values);
      const newValues = currValues.push([money, note]);
      await AsyncStorage.setItem(content.key, JSON.stringify(newValues));
      // AsyncStorage.setItem(content.key, "");
    } else {
      console.log("did you store it?");
      await AsyncStorage.setItem(content.key, JSON.stringify([[money, note]]));
    }
  } catch (e) {
    console.log(e);
  }
};

const ItemModal = ({ navigation, route }) => {
  const [note, setNote] = useState("");
  const [money, setMoney] = useState("");
  const params = route.params;
  console.log(params);
  return (
    <View>
      <Text style={{ fontSize: 30 }}>
        Category: {params.name}
      </Text>
      <Text style={{ fontSize: 30 }}>Amount $</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={val => setMoney(val)}
        value={money}
      />
      <Text style={{ fontSize: 30 }}>Note</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={val => setNote(val)}
        value={note}
      />
      <Button
        onPress={() => {
          save({ key: params.key, money, note });
          navigation.goBack();
        }}
        title="Save"
      />
    </View>
  );
};

export default ItemModal;
