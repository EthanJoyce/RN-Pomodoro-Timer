import './Global.js'
import * as React from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import Counter from './Counter'
import Settings from './Settings'


export default function App() {
  return (
    <RootNavigator />
  );
}

const RootNavigator = createDrawerNavigator({
  Counter: { screen: Counter },
  Settings: { screen: Settings },
}, {
  initialRouteName: 'Counter',
});
