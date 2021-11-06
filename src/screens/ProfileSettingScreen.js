import React, {useEffect, useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Clipboard, Image, Linking, Touchable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Background from '../components/Background'
import Modal from "react-native-modal";
export default function ProfileSettingScreen({navigation}) {

    // const [shownAddress, setShownAddress] = useState("")
    // const [address, setAddress] = useState("")
    const [profilePhoto, setProfilePhoto] = useState(" ")
    const [profileName, setProfileName] = useState("")
    const [gender, setGender] = useState("Unknown")
    const [email, setEmail] = useState("Unknown")
    const [instagram, setInstagram] = useState("Unknown")
    const [linkedin, setLinkedin] = useState("Unknown")
    const [phone, setPhone] = useState("Unknown")
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const user = async () => {
            const userPhoto = await AsyncStorage.getItem("desocial@0313/profilePhoto")
            const userName = await AsyncStorage.getItem("desocial@0313/userName")
            const userGender = await AsyncStorage.getItem("desocial@0313/userGender")
            const userEmail = await AsyncStorage.getItem("desocial@0313/userEmail")
            const userInstagram = await AsyncStorage.getItem("desocial@0313/userInstagram")
            const userLinkedin = await AsyncStorage.getItem("desocial@0313/userLinkedin")
            const userPhone = await AsyncStorage.getItem("desocial@0313/userPhone")
            if(profilePhoto){
                setProfilePhoto(userPhoto)
            }
            if(userName){
                setProfileName(userName)
            }else{
                setProfileName("anonymous")
            }
            if(userGender){
                setGender(userGender)
            }
            if(userEmail){
                setEmail(userEmail)
            }
            if(userInstagram){
                setInstagram(userInstagram)
            }
            if(userLinkedin){
                setLinkedin(userLinkedin)
            }
            if(userPhone){
                setPhone(userPhone)
            }
        }
        user();
    },[]);

    useEffect(() => {
        (async () => {
        const storedProfilePhoto = await AsyncStorage.getItem("desocial@0313/profilePhoto")
        console.log(storedProfilePhoto)
          if(storedProfilePhoto){
            setProfilePhoto(storedProfilePhoto);
          }
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        
      }, []);
    const pickProfilePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,                                   
          aspect: [3, 3],
          quality: 1,
          base64:true,
        });
        
        await AsyncStorage.setItem("desocial@0313/profilePhoto", result.uri)
        console.log(result);
    
        if (!result.cancelled) {
          setProfilePhoto(result.uri);
        }
        
      };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const removeProfilePhoto = async () => {
        const removedProfilePhoto = await AsyncStorage.setItem("desocial@0313/profilePhoto", "anonymous")
        setModalVisible(!isModalVisible);
        setProfilePhoto(removedProfilePhoto)
    }
  return (
    <View style = {{marginTop:25}}>
        <View style = {styles.topBar}>
            <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")} style = {{marginLeft:10,}}>
                <Image source = {require("../assets/arrow_back_white.png")} style = {{width: 25, height: 25, }} />
            </TouchableOpacity>
            <Text style = {{color:"white", fontSize:20, marginLeft:10,}}>{profileName}</Text>
        </View>
        <View style={styles.container}>
            <View>
                <View>
                    {profilePhoto!=="anonymous"?
                        <View>
                            <TouchableOpacity onPress = {toggleModal}>
                                <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100, borderRadius:50, borderWidth:2, borderColor:"green"}} />
                                <Image source={require('../assets/trash.png')} style = {{position:"absolute", width: 20, height:20,marginTop: 80, marginLeft: 75}} />
                            </TouchableOpacity>
                            <Modal isVisible={isModalVisible}>
                                <View>
                                <Text style = {{color:"white", textAlign:"center", fontSize:25, backgroundColor:"#222127", borderColor:"#333333", borderRadius:10, borderWidth:1,padding: 20,}}>Remove your photo?</Text>
                                <View style = {{flexDirection:"row", marginTop:50,}}>
                                    <View style = {{width:"40%", marginLeft:"5%"}}>
                                    <Button title="YES" onPress={removeProfilePhoto} />
                                    </View>
                                    <View style = {{width:"40%", marginLeft:"10%"}}>
                                    <Button title="CANCEL" onPress={toggleModal} />
                                    </View>
                                </View>
                                </View>
                            </Modal>
                        </View>:
                        <TouchableOpacity onPress = {pickProfilePhoto}>
                            <Image source = {require('../assets/avatar.png')} style={{ width: 80, height: 80, marginTop:10,}} />
                            <Text style = {styles.addProfileIcon}>+</Text>
                        </TouchableOpacity>
                    }
                    
                </View>
                <Text style = {{textAlign:'center', marginTop:5,}}>{profileName}</Text>
            </View>
            <View style = {styles.myStatus}>
                <View style = {styles.postStatus}>
                    <Text style={{textAlign:"center"}}>0</Text>
                    <Text>posts</Text>
                </View>
                <View style = {styles.followerStatus}>
                    <Text style={{textAlign:"center"}}>0</Text>
                    <Text>followers</Text>
                </View>
                <View style = {styles.followingStatus}>
                    <Text style={{textAlign:"center"}}>0</Text>
                    <Text>following</Text>
                </View>
            </View>
            <View style = {{marginTop:30}}>
                    <Text>*Gender: {gender}</Text>
                    <Text>*E-mail: {email}</Text>
                    <Text>*Instagram Link: {instagram}</Text>
                    <Text>*Linkedin Link: {linkedin}</Text>
                    <Text>*Phone Number: {phone}</Text>
            </View>
            <View style = {{width:"80%", marginTop: 40,}}>
                <Button mode="contained" title = "EDIT PROFILE" onPress={() => navigation.replace('EditProfileScreen')} color = "#333333" />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container :{
        // flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:70,
    },
    row :{
        flexDirection : "row",
        marginTop: 20,
    },
    address :{
        width: "50%",
        alignItems: "center",
    },
    balance :{
        width: "50%",
        alignItems: "center",
    },
    myStatus:{
        flexDirection: "row",
        marginTop:20,
    },
    followerStatus: {
        marginLeft: 25,
    },
    followingStatus: {
        marginLeft: 25,
    },
    addProfileIcon: {
        position: "absolute",
        marginTop:65,
        marginLeft:52,
        fontSize:23,
        color:"white",
        backgroundColor:"#0099ff",
        width:28,
        height:28,
        borderRadius:14,
        borderWidth:2,
        borderColor:"white",
        textAlign:"center",
    },
    topBar: {
        flexDirection:"row",
        backgroundColor:"#002e4d",
        padding:10,
    }
})