import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';
import Account from '../components/Account';
import Modal from "react-native-modal";

import { useSelector/* , useDispatch */} from 'react-redux';
/* import slice from '../../reducer'; */

function PostedViewScreen({navigation}) {
    const G = useSelector(state => state);
	/* const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json)); */

    // const currentPage = useSelector(....)
    const [isModalVisible, setModalVisible] = useState(false);
    const [article, setArticle] = useState(" ");
    const [goodFeedbackStatu,setGoodFeedbackStatu] = useState(false)
    const [badFeedbackStatu,setBadFeedbackStatu] = useState(false)
    const [followingAmount, setFollowingAmount] = useState("0")
    const [height, setHeight] = useState(false);
    
    useEffect(() => {
        (async () => {
            /* const storedPostsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount") */
            const storedArticle = await AsyncStorage.getItem("desocial@0313/article"+G.currentPage);
            setArticle(JSON.parse(storedArticle))
            
            const L = JSON.parse(storedArticle)[0].length;
            if(L>35){
                setHeight(true)
            }
            const storedFollowingStatu = await AsyncStorage.getItem("desocial@0313/followingStatu")
            setFollowingAmount(storedFollowingStatu)
            // const articleContentsHeight = ;
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        
    }, [G.currentPage]);

    const toggleImageModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onGoodFeedback = async () => {
        if(badFeedbackStatu===true){
            setBadFeedbackStatu(!badFeedbackStatu)
            setGoodFeedbackStatu(!goodFeedbackStatu)
            setFollowingAmount("1")
            await AsyncStorage.setItem("desocial@0313/followingStatu", "1")
        }else{
            if(goodFeedbackStatu===true){
                setGoodFeedbackStatu(!goodFeedbackStatu)
                setFollowingAmount("0")
                await AsyncStorage.setItem("desocial@0313/followingStatu", "0")
            }else{
                setGoodFeedbackStatu(!goodFeedbackStatu)
                setFollowingAmount("1")
                await AsyncStorage.setItem("desocial@0313/followingStatu", "1")
            }
        }
    }
    const onBadFeedback = async () => {
        if(goodFeedbackStatu===true){
            setGoodFeedbackStatu(!goodFeedbackStatu)
            setBadFeedbackStatu(!badFeedbackStatu)
            setFollowingAmount("-1")
            await AsyncStorage.setItem("desocial@0313/followingStatu", "-1")
        }else{
            if(badFeedbackStatu===true){
                setBadFeedbackStatu(!badFeedbackStatu)
                setFollowingAmount("0")
                await AsyncStorage.setItem("desocial@0313/followingStatu", "0")
            }else{
                setBadFeedbackStatu(!badFeedbackStatu)
                setFollowingAmount("-1")
                await AsyncStorage.setItem("desocial@0313/followingStatu", "-1")
            }
        }
    }
    return (
        <View>
            <Account />
            <View style = {{flexDirection:"row", marginLeft:10, marginTop:5,borderBottomWidth:2, borderBottomColor:"#737373", width:"100%", paddingBottom:10,}}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Image source = {require("../assets/arrow_back.png")} style = {{width:25, height:25,}} />
                </TouchableOpacity>
                {article[0].length<=10?
                    <Text style = {{fontSize:18, marginLeft:10,}}>{article[0]}</Text>:
                    <Text style = {{fontSize:18, marginLeft:10,}}>{article[0].slice(0,10)}...</Text>
                }
                <Text style = {{fontSize:12, color:"grey", marginLeft:10,marginTop:6,}}> saved at </Text>
                <Text style = {{fontSize:10, color:"#333333",marginTop:8,}}> {article[3]}</Text>
            </View>
            <Text style = {styles.titleStyle}>{article[0]}</Text>
            <ScrollView style = {{marginTop:10,height:350}}>
                <TouchableOpacity onPress = {toggleImageModal} >
                    <Image source = {{uri: article[1]}} style = {styles.topicImageStyle} />
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} style = {{marginLeft:30,}}>
                    <TouchableOpacity onPress = {toggleImageModal}>
                        <Image source = {require("../assets/cross.png")} style = {{width:20, height:20, marginBottom:30,marginLeft:"80%"}} />
                    </TouchableOpacity>
                    <Image source = {{uri: article[1]}} style = {{width:300, height:240}} />
                    <Text style = {{color:"white"}}>{article[0]}</Text>
                    <Text style = {{color:"white", textAlign:"right", padding:30,}}>Copyright@0x21.</Text>
                </Modal>
                <View style = {styles.articleStyle}>
                    <HTMLView value = {article[2]} />
                </View>
                <View style = {{borderWidth:0.5,borderColor:"grey", width:"80%", marginLeft:"10%", paddingVertical:10, marginVertical:20,}}>
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
                {height===true?
                <View>
                    <View style = {{flexDirection:"row", marginTop:10,}}>
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ {followingAmount}</Text>
                        <View style = {{marginLeft:20,}}>
                            {(article[4]!=="anonymous")?
                                <Image source = {{uri:article[4]}} style = {{width:25, height:25, borderRadius:12.5,}} />:
                                <Image source={require("../assets/avatarrandom.png")} style = {{width:20, height:20, borderRadius:10,}} />
                            }
                        </View>
                        <Text style = {{color:"black", marginLeft:7,fontSize:10, color:"grey", marginTop:8,}}>{article[5]}</Text>
                    </View>
                    <Text style = {{color:"#333333", textAlign:"right", padding:10,}}>Copyright@0x21 </Text>
                </View>:null
                }
            </ScrollView>
            {height===false?
                <View>
                    <View style = {{flexDirection:"row", marginTop:10,}}>
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ {followingAmount}</Text>
                        <View style = {{marginLeft:20,}}>
                            {(article[4]!=="anonymous")?
                                <Image source = {{uri:article[4]}} style = {{width:25, height:25, borderRadius:12.5,}} />:
                                <Image source={require("../assets/avatarrandom.png")} style = {{width:20, height:20, borderRadius:10,}} />
                            }
                        </View>
                        <Text style = {{color:"black", marginLeft:7,fontSize:10, color:"grey", marginTop:8,}}>{article[5]}</Text>
                    </View>
                    <Text style = {{color:"#333333", textAlign:"right", padding:10,}}>Copyright@0x21 </Text>
                </View>:null
            }
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
export default PostedViewScreen;