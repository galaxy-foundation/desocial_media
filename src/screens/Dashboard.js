import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  

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
        <Tab.Screen name="Home" component={HomeScreen} options = {{tabBarIcon:({focused})=>(
          <Ionicons name="ios-home" focused={focused} color={focused?"#0099ff":"#737373"} size={25}/>
        )}} />
        <Tab.Screen name="Posts" component={PostScreen} 
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="add-circle-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={25}/>
        )}}
        />
        <Tab.Screen name="Followings" component={FollowingScreen} 
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="heart-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={25}/>
        )}}
        />
        <Tab.Screen name="Settings"
          component={SettingsScreen}
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="menu-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={25}/>
        )}}
        />
      </Tab.Navigator>
      
    // </NavigationContainer>
  );
}
