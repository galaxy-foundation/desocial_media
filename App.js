import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import "react-native-get-random-values"
import unorm from 'unorm';
String.prototype.normalize = function(form) {
  var func = unorm[(form || 'NFC').toLowerCase()];
  if (!func) {
    throw new RangeError('invalid form - ' + form);
  }
  return func(this);
};
import "@ethersproject/shims"
import { ethers } from 'ethers';
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  MnemonicCopyScreen,
  EditProfileScreen,
  HomeScreen,
  ChangePasswordScreen,
} from './src/screens'
const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="MnemonicCopyScreen" component={MnemonicCopyScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
