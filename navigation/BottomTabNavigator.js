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
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pie" />,
        }}
      />
      <BottomTab.Screen
        name="items"
        component={ItemScreen}
        options={{
          title: 'Items',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list" />,
        }}
      />
      <BottomTab.Screen
        name="tobuy"
        component={ToBuyScreen}
        options={{
          title: 'To Buy',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list-box" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'overview':
      return 'How to get started';
    case 'items':
      return 'Links to learn more';
    case 'tobuy':
      return 'Links to learn more';
  }
}
