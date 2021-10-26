import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export default function SettingsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress = {()=>navigation.replace('ChangePasswordScreen')}>
            <Text>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.replace('LoginScreen')}>
            <Text>Recovery Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.replace('LoginScreen')}>
            <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  