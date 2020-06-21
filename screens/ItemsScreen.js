import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { labelKeys } from "../components/utils/constants";
import { loadData } from "../components/utils/utils";

const RowButton = ({ label, money, openModal, onPress }) => {
  return (
    <View style={styles.row}>
      <View>
        <Ionicons
          name="md-add"
          onPress={openModal}
          size={18}
          style={{ margin: 5, flex: 1 }}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Button title={label} onPress={onPress} />
      </View>
      <View>
        <Text>
          {money}
        </Text>
      </View>
    </View>
  );
};

const ItemsScreen = ({ navigation }) => {
  const [allExpense, setAllExpense] = useState([]);

  useEffect(() => {
    loadData(allExpense).then(res => {
      setAllExpense(res.data);
    });
  }, []);

  console.log(navigation);
  return (
    <ScrollView style={styles.container}>
      {allExpense.map(({ name, amount }) => {
        console.log(name, amount, allExpense);
        return (
          <RowButton
            key={name}
            label={name}
            money={amount}
            openModal={() =>
              navigation.navigate("New", {
                key: labelKeys[name],
                name
              })}
            onPress={() =>
              navigation.navigate("Category", {
                name,
                key: labelKeys[name]
              })}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    marginBottom: 5
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});

export default ItemsScreen;
