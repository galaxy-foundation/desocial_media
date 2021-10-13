import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Alert, StyleSheet, Button, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./bg.jpg')} style={styles.image}>
        <View style={styles.buttonContainer}>
        <Button title = "Get Start" onPress={() => history.push()} color="transparent" style={styles.button1} />
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    width:"50%", 
    marginLeft:'25%',
    marginTop: '75%',
  },
  button1: {
    borderColor: "red",
  }
});
