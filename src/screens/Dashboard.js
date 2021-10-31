import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  

import HomeScreen from './HomeScreen'
import PostScreen from './PostScreen'
import SettingsScreen from './SettingScreen'
import FollowingScreen from './FollowingScreen'
import Background from '../components/Background'
import Account from '../components/Account';
// import { white } from 'react-native-paper/lib/typescript/styles/colors';
const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
	<>
		<Account />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options = {{tabBarIcon:({focused})=>(
          <Ionicons name="ios-home" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
        )}} />
        <Tab.Screen name="Posts" component={PostScreen} 
          options = {{tabBarIcon:({focused})=>(
          	<View>
           		<Ionicons name="add-circle-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
           		<Text style = {styles.alamAmount_post}>4</Text>
        	</View>
        )}}
        />
        <Tab.Screen name="Followings" component={FollowingScreen} 
          options = {{tabBarIcon:({focused})=>(
			<View>
				<Ionicons name="heart-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
				<Text style = {styles.alamAmount_following}>1</Text>
			</View>
        )}}
        />
        <Tab.Screen name="Settings"
          component={SettingsScreen}
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="menu-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
        )}}
        />
      </Tab.Navigator>
	  </>
  );
}


const styles = StyleSheet.create ({
	alamAmount_post:{
		position:"absolute",
		backgroundColor:"green",
		// borderWidth:1,
		borderRadius:7,
		color: "white",
		fontSize:10,
		padding: 2,
		width:14,
		height:14,
		fontWeight:"bold",
	},
	alamAmount_following:{
		position:"absolute",
		backgroundColor:"red",
		// borderWidth:1,
		borderRadius:7,
		color: "white",
		fontSize:10,
		padding: 2,
		width:14,
		height:14,
		fontWeight:"bold",
	}
})