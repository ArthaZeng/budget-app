import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { CATEGORIES } from "./constants";

const OptionButton = ({ label, onPress }) => {
  return (
    <RectButton style={styles.option} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.optionText}>
          {label}
        </Text>
      </View>
    </RectButton>
  );
};

const ItemsScreen = ({ navigation }) => {
  console.log(navigation);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fixToText}>
        <Button
          title="Spend"
          onPress={() => navigation.navigate("ItemModal")}
        />
        <Button title="Gain" onPress={() => navigation.navigate("ItemModal")} />
      </View>
      {Object.entries(CATEGORIES).map(entry => {
        console.log(entry);
        return (
          <OptionButton
            key={entry[1].label}
            label={entry[1].label}
            onPress={entry => navigation.navigate("Category")}
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
