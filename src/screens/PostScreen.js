import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';


export default function PostScreen({navigation}) {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [topicImage, setTopicImage] = useState(null);
  const [postedTime, setPostedTime] = useState("");
  const [postsAmount, setPostsAmount] = useState("");
  useEffect(() => {
    (async () => {
      const storedAmount = await AsyncStorage.getItem("desocial@0313/postsAmount")
      setPostsAmount(storedAmount)
      console.log(postsAmount)
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
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    
  }, []);

  const viewPost  = () => {
    navigation.replace("PostViewScreen")
  }
  var postsItems = [];
  for(let i = 1; i<=postsAmount;i++){
    postsItems.push(
        <TouchableOpacity style = {{flexDirection:"row", marginLeft:20, padding:10,}} onPress = {viewPost} key = {postsItems}>
            <View>
              <Image source = {{uri:topicImage}} style = {{width:50, height:40}} />
            </View>
            <View style = {{marginLeft:20,}}>
              <Text style = {{fontSize:15,}}>{articleTitle}</Text>
              <View style = {{flexDirection:"row"}}>
                <Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
                <Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
              </View>
            </View>
        </TouchableOpacity>
    );
  }
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('PostEditScreen')} style = {{zIndex:1,marginTop:-50, marginLeft:320,}}>
        <Text style = {{color:"black", fontSize:30,color:"#737373"}}>+</Text>
      </TouchableOpacity>
      <ScrollView>
        {article?
          <View style = {{marginTop:20,}}>
            {postsItems}
          </View>:
          <View style = {{marginTop:"20%", alignItems: 'center', justifyContent: 'center' ,}}>
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
      </ScrollView>
    </View>
  );
}