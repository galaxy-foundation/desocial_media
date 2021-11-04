import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
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
  const [goodFeedbackStatu,setGoodFeedbackStatu] = useState(false)
  const [badFeedbackStatu,setBadFeedbackStatu] = useState(false)
  const [followingAmount, setFollowingAmount] = useState("0")
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
        const storedFollowingStatu = await AsyncStorage.getItem("desocial@0313/followingStatu")
        setFollowingAmount(storedFollowingStatu)
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

const onGoodFeedback = async () => {
    if(badFeedbackStatu===true){
        setBadFeedbackStatu(!badFeedbackStatu)
        setGoodFeedbackStatu(!goodFeedbackStatu)
    }else{
        setGoodFeedbackStatu(!goodFeedbackStatu)
    }
    await AsyncStorage.setItem("desocial@0313/followingStatu", "1")
    if(goodFeedbackStatu===true){
        setFollowingAmount("0")
        await AsyncStorage.setItem("desocial@0313/followingStatu", "0")
    }else{
        setFollowingAmount("1")
        await AsyncStorage.setItem("desocial@0313/followingStatu", "1")
    }
}
const onBadFeedback = async () => {
    if(goodFeedbackStatu===true){
        setGoodFeedbackStatu(!goodFeedbackStatu)
        setBadFeedbackStatu(!badFeedbackStatu)
    }else{
        setBadFeedbackStatu(!badFeedbackStatu)
    }
    await AsyncStorage.setItem("desocial@0313/followingStatu", "0")
    setFollowingAmount("0")
}
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
        <ScrollView style = {{marginTop:10,height:420}}>
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
            <View style = {{borderWidth:1, width:"80%", marginLeft:"10%", paddingVertical:10, marginTop:40,}}>
                <Text style= {{textAlign:"center"}}>Is this article helpful?</Text>
                <View style = {{flexDirection:"row", justifyContent:"center"}}>
                    {(badFeedbackStatu===true)?
                        <TouchableOpacity onPress = {onBadFeedback}>
                            <Image source = {require('../assets/following_bad.png')} style ={{width:40, height:40,}} />
                        </TouchableOpacity>:
                        <TouchableOpacity onPress = {onBadFeedback}>
                            <Image source = {require('../assets/following_bad_off.png')} style ={{width:40, height:40,}} />
                        </TouchableOpacity>
                    }
                    {(goodFeedbackStatu===true)?
                        <TouchableOpacity style = {{ marginLeft:30,}} onPress = {onGoodFeedback}>
                            <Image source = {require('../assets/following_good.png')} style ={{width:40, height:40}} />
                        </TouchableOpacity>:
                        <TouchableOpacity style = {{ marginLeft:30,}} onPress = {onGoodFeedback}>
                            <Image source = {require('../assets/following_good_off.png')} style ={{width:40, height:40}} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ {followingAmount}</Text>
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