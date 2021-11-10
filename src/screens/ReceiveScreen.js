import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Button, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function ReceiveScreen({navigation}) {
    return(
        <View>
            <View style = {{flexDirection:"row", marginTop:20, backgroundColor:"#002e4d", paddingVertical:10,}}>
                <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")}>
                    <Image source = {require('../assets/arrow_back_white.png')} style = {{width:40, height:40, }} />
                </TouchableOpacity>
                <Text style = {{color:"white", marginLeft:10,fontSize:20, marginTop:5,}}>RECEIVE</Text>
            </View>
        </View>
    )
}