import React from 'react';
import { ImageBackground, Alert, StyleSheet, Button, Text, View } from 'react-native';

export default function Login() {
    return(
        <View>
        <Text  style = {styles.container}>
            this is te Login page
        </Text></View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: 'red',
    },
  });
  