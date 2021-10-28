import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
    const storedUri = await AsyncStorage.getItem("desocial@0313/uri")
    console.log(storedUri)
      if(storedUri){
        setImage(storedUri);
      }else{alert('No POSTS')}
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,                                   
      aspect: [4, 3],
      quality: 1,
    });
    
    await AsyncStorage.setItem("desocial@0313/uri", result.uri)
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image)
    }
    
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Upload media" onPress={pickImage} />
      {image?<Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop:30, }} />:<Text style={{ width: 200, height: 200, marginTop:30, textAlign:"center", borderWidth:1, borderColor:"#737373", color:"#737373"}}>NO POSTS</Text>}
      
    </View>
  );
}