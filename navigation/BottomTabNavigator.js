import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemsScreen';
import ToBuyScreen from '../screens/ToBuyScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Overview';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="overview"
        component={HomeScreen}
        options={{
          title: 'Overview',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="items"
        component={ItemScreen}
        options={{
          title: 'Items',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="tobuy"
        component={ToBuyScreen}
        options={{
          title: 'To Buy',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-barcode" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Overview':
      return 'How to get started';
    case 'Items':
      return 'Links to learn more';
    case 'To Buy':
      return 'Links to learn more';
  }
}
