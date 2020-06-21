import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CATEGORIES } from "./constants";
import AsyncStorage from "@react-native-community/async-storage";

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

const amount = arr => {
  return arr ? arr.reduce((total, curr) => total + curr[0], 0) : 0;
};

const ItemsScreen = ({ navigation }) => {
  const [allExpense, setAllExpense] = useState([]);

  const getAllExpense = async () => {
    const currMoneyArr = {};
    for (const entry in CATEGORIES) {
      const currMoney = await AsyncStorage.getItem(entry.key);
      console.log("currMoney", currMoney);
      currMoneyArr[entry.label] = currMoney;
    }
    return currMoneyArr;
  };

  useEffect(() => {
    setAllExpense(getAllExpense());
  }, []);

  console.log(navigation);
  return (
    <ScrollView style={styles.container}>
      {Object.entries(CATEGORIES).map(entry => {
        console.log(entry, allExpense);
        return (
          <RowButton
            key={entry[1].label}
            label={entry[1].label}
            money={0}
            openModal={() =>
              navigation.navigate("New", {
                key: entry[1].key,
                name: entry[1].label
              })}
            onPress={() =>
              navigation.navigate("Category", {
                objKey: entry[0],
                key: entry[1].key
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
