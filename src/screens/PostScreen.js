import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';


export default function PostScreen({navigation}) {
  const [status, setStatus] = useState({
    articles: [],
    count: 0,
  });
  /* const [articles, setArticles] = useState([]); */
  // const [articleTitle, setArticleTitle] = useState("");
  // const [topicImage, setTopicImage] = useState(null);
  // const [postedTime, setPostedTime] = useState("");
  /* const [postsAmount, setPostsAmount] = useState(""); */
  useEffect(() => {
    (async () => {
      const postsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount")
      const count = !isNaN(postsAmount) ? Number(postsAmount) : 0;
      const articles = [];
      for(let i = 1; i<=postsAmount;i++){
        const storedArticles = await AsyncStorage.getItem("desocial@0313/article"+i);
        articles.push(JSON.parse(storedArticles))
      }
      setStatus({articles, count})
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
  return (
    <View>
      <Text style = {{color:"black", fontSize:20, zIndex:1,marginTop:-40, marginLeft:80,}}>({status.count})</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PostEditScreen')} style = {{zIndex:1,marginTop:-40, marginLeft:320,}}>
        <Text style = {{fontSize:30,color:"#737373"}}>+</Text>
      </TouchableOpacity>
      <ScrollView>
        {status.count!==0?
          <View style = {{marginTop:20,}}>
            {status.articles.map((v,k)=>(
              <TouchableOpacity style = {{flexDirection:"row", marginLeft:20, padding:10,}} onPress = {viewPost} key = {k}>
                  <View>
                    <Image source = {{uri:v[1]}} style = {{width:50, height:40}} />
                  </View>
                  <View style = {{marginLeft:20,}}>
                    <Text style = {{fontSize:15,}}>{v[0]}</Text>
                    <View style = {{flexDirection:"row"}}>
                      <Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
                      <Text style = {{fontSize:10, color:"grey"}}>{v[3]}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            ))}
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