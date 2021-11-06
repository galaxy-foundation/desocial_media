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
  ProfileSettingScreen,
  ChangePasswordScreen,
  PostEditScreen,
  PostViewScreen,
  RecommandedPostScreen,
} from './src/screens'

import { Provider as ReduxProvider } from 'react-redux';
import store from './store'

const Stack = createStackNavigator()

export default function App() {
  return (
    <ReduxProvider store={store}>
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
            <Stack.Screen name="ProfileSettingScreen" component={ProfileSettingScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="PostEditScreen" component={PostEditScreen} />
            <Stack.Screen name="PostViewScreen" component={PostViewScreen} />
            <Stack.Screen name="RecommandedPostScreen" component={RecommandedPostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ReduxProvider>
  )
}
