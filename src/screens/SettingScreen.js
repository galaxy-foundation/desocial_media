import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export default function SettingsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "60%", marginLeft:"20%" }}>
        <TouchableOpacity onPress = {()=>navigation.replace('ChangePasswordScreen')} style = {{backgroundColor:"#333333",padding:10, width:"100%", borderRadius:7,}}>
            <Text style = {{color:"white", textAlign:"center"}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.replace('LoginScreen')} style = {{marginTop:40, backgroundColor:"#333333",padding:10, width:"100%", borderRadius:7,}}>
            <Text style = {{color:"white", textAlign:"center"}}>Recovery Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.replace('LoginScreen')} style = {{marginTop:40, backgroundColor:"white",padding:10, width:"100%", borderWidth:0.5, borderColor:"#333333", borderRadius:7,}}>
            <Text style = {{color:"#333333", textAlign:"center"}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  