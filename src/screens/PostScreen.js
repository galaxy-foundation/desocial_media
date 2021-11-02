import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';


export default function ImagePickerExample({navigation}) {
  const [article, setArticle] = useState(null);
  // const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   if(image){
  //     setModalVisible(!isModalVisible);
  //   }else{
  //     return
  //   }
  // };
  // const removeMedia = async () => {
  //   await AsyncStorage.setItem("desocial@0313/uri", "")
  //   setImage(null)
  //   setModalVisible(!isModalVisible);
  // }
  useEffect(() => {
    (async () => {
    const storedArticle = await AsyncStorage.getItem("desocial@0313/article")
    console.log(storedArticle)
      if(storedArticle){
        setArticle(storedArticle);
      }
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,                                   
  //     aspect: [4, 3],
  //     quality: 1,
  //     base64:true,
  //   });
    
  //   await AsyncStorage.setItem("desocial@0313/uri", result.uri)
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     console.log(image)
  //   }
    
  // };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' ,}}>
      <TouchableOpacity onPress={() => navigation.navigate('PostEditScreen')} style = {{zIndex:1,marginTop:-50, marginLeft:250,}}>
        <Text style = {{color:"black", fontSize:30,color:"#737373"}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        {article?
          <View>
            <HTMLView value = {article} />
          </View>:
          <View style = {{marginTop:"20%"}}>
            <Image source = {require("../assets/items.png")} />
            <View style = {{alignItems:"center", marginTop:-30}}>
              <Text style={{ color:"#737373", }}>NO POSTS</Text>
              <View style = {{flexDirection:"row"}}>
                <Text style = {{ fontSize:10,}}>
                  <Text style = {{textDecorationLine:"underline", color:"blue"}} onPress = {() => navigation.navigate('PostEditScreen')}>Post</Text>
                  <Text> your New Article</Text>
                </Text>
              </View>
            </View>
          </View>
        }
      </TouchableOpacity>
      {/* <Modal isVisible={isModalVisible}>
        <View>
          <Image source={{ uri: image }} style={{ width: "100%", height: 300,}} />
          <Text style = {{color:"white", textAlign:"center", fontSize:25, backgroundColor:"#737373", borderColor:"black", borderRadius:10, borderWidth:1, marginTop:10,}}>Will you remove it out from posts ?</Text>
          <View style = {{flexDirection:"row", marginTop:50,}}>
            <View style = {{width:"50%", marginLeft:"5%"}}>
              <Button title="Remove Media Out" onPress={removeMedia} />
            </View>
            <View style = {{width:"30%", marginLeft:"10%"}}>
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}