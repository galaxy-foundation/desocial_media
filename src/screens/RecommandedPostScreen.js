import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import Account from '../components/Account'

export default function RecommandedPostScreen({navigation}) {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [topicImage, setTopicImage] = useState(null);
  const [postedTime, setPostedTime] = useState("");
  const [recommandedPoster, setRecommandedPoster] = useState('')
  useEffect(() => {
    (async () => {
      const storedUserName = await AsyncStorage.getItem("desocial@0313/userName")
       setRecommandedPoster(storedUserName)
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
    navigation.navigate("PostViewScreen")
  }
  return (
    <View>
      <Account />
      <View style = {{flexDirection:"row", marginLeft:10, marginTop:10,}}>
          <TouchableOpacity onPress = {() => navigation.replace('Dashboard')}>
              <Image source = {require('../assets/arrow_back.png')}  style = {{width: 30, height:30,}} />
          </TouchableOpacity>
          <Text style = {{fontSize:20,marginLeft:10,}}>{recommandedPoster}</Text>
      </View>
      <View>
          <TouchableOpacity style = {{flexDirection:"row", padding:20,}} onPress = {viewPost}>
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
          </TouchableOpacity>
      </View>
    </View>
  );
}