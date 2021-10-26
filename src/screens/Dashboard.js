import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen'
import PostScreen from './PostScreen'
import SettingsScreen from './SettingScreen'
import FollowingScreen from './FollowingScreen'
import Background from '../components/Background'
const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    // <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Posts" component={PostScreen} />
        <Tab.Screen name="Followings" component={FollowingScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}
