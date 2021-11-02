import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';
import Account from '../components/Account';

export default function PostViewScreen({navigation}) {
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [topicImage, setTopicImage] = useState("");
  const [postedTime, setPostedTime] = useState("");
  useEffect(() => {
    (async () => {
        const storedArticleTitle = await AsyncStorage.getItem("desocial@0313/articleTitle")
        setArticleTitle(storedArticleTitle)
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


  return (
    <View>
        <Account />
        <View style = {{flexDirection:"row", marginLeft:10, marginTop:5,}}>
            <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                <Image source = {require("../assets/arrow_back.png")} style = {{width:25, height:25,}} />
            </TouchableOpacity>
            <Text style = {{fontSize:18, marginLeft:20,}}>Posted</Text>
            <Text style = {{fontSize:12, color:"grey", marginLeft:10,marginTop:6,}}> saved at </Text>
            <Text style = {{fontSize:10, color:"#333333",marginTop:8,}}> {postedTime}</Text>
        </View>
        <Text style = {{fontSize:50,}}><HTMLView value = {articleTitle} style = {styles.titleStyle} /></Text>
        <ScrollView>
            <HTMLView value = {article} />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    titleStyle: {
        alignItems:"center",
        
    }
})