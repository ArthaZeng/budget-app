import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryScreen from "../screens/CategoryScreen";
import ItemsScreen from "../screens/ItemsScreen";

const Stack = createStackNavigator();

export default function ExpensePageNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Expense"
          component={ItemsScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
