import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';


export default function FollowingScreen({navigation}) {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [topicImage, setTopicImage] = useState(null);
  const [postedTime, setPostedTime] = useState("");
  const [followingStatu, setFollowingStatu] = useState("")
  useEffect(() => {
    (async () => {
      const storedArticleTitle = await AsyncStorage.getItem("desocial@0313/articleTitle") || '';
        if(storedArticleTitle.length >= 30){
          const showItemTitle = storedArticleTitle.slice(0,30) + "...";
          setArticleTitle(showItemTitle)
        }else{
          setArticleTitle(storedArticleTitle)
        }
      const storedTopicImage = await AsyncStorage.getItem("desocial@0313/articleTopicImage")
        setTopicImage(storedTopicImage)
      const storedArticle = await AsyncStorage.getItem("desocial@0313/article")
      if(storedArticle){
        setArticle(storedArticle);
      }
      const storedTime = await AsyncStorage.getItem("desocial@0313/articlePostTime")
        setPostedTime(storedTime)
      const storedFollowingStatu = await AsyncStorage.getItem("desocial@0313/followingStatu")
      setFollowingStatu(storedFollowingStatu)
      if (Platform.OS !== 'web') { 
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  }, []);

  const viewPost  = () => {
    navigation.navigate("PostViewScreen")
  }
  return (
    <View>
      <View>
        {(followingStatu==="1")?
          <TouchableOpacity style = {{flexDirection:"row", marginTop:10, padding:20,}} onPress = {viewPost}>
            <View>
              <Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
            </View>
            <View style = {{marginLeft:20,}}>
              <Text style = {{fontSize:15,}}>{articleTitle}</Text>
              <View style = {{flexDirection:"row"}}>
                <Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
                <Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
              </View>
            </View>
          </TouchableOpacity>:
          <View style = {{marginTop:"20%", alignItems: 'center', justifyContent: 'center' ,}}>
            <Image source = {require("../assets/items.png")} />
            <View style = {{alignItems:"center", marginTop:-30}}>
              <Text style={{ color:"#737373", }}>No Items</Text>
            </View>
          </View>
        }
      </View>
    </View>
  );
}