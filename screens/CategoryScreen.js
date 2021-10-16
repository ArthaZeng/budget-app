import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Text, Button } from "react-native";

const parseTransactions = allTransactions => {
  if (!allTransactions) {
    return;
  }

  return allTransactions.map(row => {
    return (
      <View key={row[1]}>
        <Text>
          {row[1]}: {row[0]}
        </Text>
        <Button title="delete" onPress={() => {}} />
      </View>
    );
  });
};

const Item = ({ navigation, route }) => {
  const [expense, setExpenses] = useState(0);
  const { key: categoryKey, name } = route.params;

  useEffect(
    () => {
      async function getAllExpenses() {
        const currMoney = await AsyncStorage.getItem(categoryKey);
        console.log("currMoney", currMoney);
        const allTransactions = currMoney ? JSON.parse(currMoney) : null;
        setExpenses(parseTransactions(allTransactions));
      }
      getAllExpenses();
    },
    [categoryKey]
  );

  return (
    <View>
      <Text>
        {name}
      </Text>
      <Text>
        {expense}
      </Text>
    </View>
  );
};

export default Item;
