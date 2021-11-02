import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';
import Account from '../components/Account';
import Modal from "react-native-modal";

export default function PostViewScreen({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [article, setArticle] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [topicImage, setTopicImage] = useState(null);
  const [postedTime, setPostedTime] = useState("");
  const [topbarTitle, setTopbarTitle] = useState("");
  useEffect(() => {
    (async () => {
        const storedArticleTitle = await AsyncStorage.getItem("desocial@0313/articleTitle")
        setArticleTitle(storedArticleTitle)
        const showTpbarTitle = storedArticleTitle.slice(0,10)
        setTopbarTitle(showTpbarTitle)
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

  const toggleImageModal = () => {
    setModalVisible(!isModalVisible);
};

  return (
    <View>
        <Account />
        <View style = {{flexDirection:"row", marginLeft:10, marginTop:5,borderBottomWidth:2, borderBottomColor:"#737373", width:"100%", paddingBottom:10,}}>
            <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                <Image source = {require("../assets/arrow_back.png")} style = {{width:25, height:25,}} />
            </TouchableOpacity>
            <Text style = {{fontSize:18, marginLeft:10,}}>{topbarTitle}...</Text>
            <Text style = {{fontSize:12, color:"grey", marginLeft:10,marginTop:6,}}> saved at </Text>
            <Text style = {{fontSize:10, color:"#333333",marginTop:8,}}> {postedTime}</Text>
        </View>
        <Text style = {styles.titleStyle}>{articleTitle}</Text>
        <ScrollView style = {{marginTop:10,}}>
            <TouchableOpacity onPress = {toggleImageModal} >
                <Image source = {{uri: topicImage}} style = {styles.topicImageStyle} />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} style = {{marginLeft:30,}}>
                <TouchableOpacity onPress = {toggleImageModal}>
                    <Image source = {require("../assets/cross.png")} style = {{width:20, height:20, marginBottom:30,marginLeft:"80%"}} />
                </TouchableOpacity>
                <Image source = {{uri: topicImage}} style = {{width:300, height:240}} />
                <Text style = {{color:"white"}}>{articleTitle}</Text>
                <Text style = {{color:"white", textAlign:"right", padding:30,}}>Copyright@0x21.</Text>
            </Modal>
            <View style = {styles.articleStyle}>
                <HTMLView value = {article} />
            </View>
            <Text style = {{color:"#333333", textAlign:"right", padding:30,}}>Copyright@0x21 </Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    titleStyle: {
        textAlign:"center",
        fontSize:30, 
        marginTop:5,
        padding:10,       
    },
    topicImageStyle: {
        width:150, 
        height:120,
        marginLeft:100,
        marginTop:20,
    },
    articleStyle: {
        marginTop:10,
        alignItems:"center",
        padding:20,
    }
})