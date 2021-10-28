import React, {useEffect, useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Clipboard, Image, Linking } from 'react-native';
// import Button from '../components/Button'
import Background from '../components/Background'
import Modal from "react-native-modal";

export default function HomeScreen({navigation}) {

    const [shownAddress, setShownAddress] = useState("")
    const [address, setAddress] = useState("")
    const [profileName, setProfileName] = useState("")
    const [gender, setGender] = useState("Unknown")
    const [email, setEmail] = useState("Unknown")
    const [instagram, setInstagram] = useState("Unknown")
    const [linkedin, setLinkedin] = useState("Unknown")
    const [phone, setPhone] = useState("Unknown")
    const [isModalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const runInit = async () => {
            const publicKey = await AsyncStorage.getItem("desocial@0313/publicKey")
            setAddress(publicKey)
            const shownAddress = publicKey.slice(0,5) + " ..."+ publicKey.slice(-2)
            setShownAddress(shownAddress)
        }
        runInit();
        const user = async () => {
            const userName = await AsyncStorage.getItem("desocial@0313/userName")
            const userGender = await AsyncStorage.getItem("desocial@0313/userGender")
            const userEmail = await AsyncStorage.getItem("desocial@0313/userEmail")
            const userInstagram = await AsyncStorage.getItem("desocial@0313/userInstagram")
            const userLinkedin = await AsyncStorage.getItem("desocial@0313/userLinkedin")
            const userPhone = await AsyncStorage.getItem("desocial@0313/userPhone")
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

    const copyToClipboard = async () => {
        Clipboard.setString(address)
        alert("Copied to clipboard !")
    }
    const toggleModal = () => {
          setModalVisible(!isModalVisible);
      };
    const openExplorer = () => {
        setModalVisible(!isModalVisible);
        Linking.openURL("https://bscscan.com/address/"+ `${address}`)
    }
  return (
    <View style={styles.container}>
        <View style = {styles.row}>
            <TouchableOpacity onPress={() => copyToClipboard()} style = {styles.address}>
                <Text>{shownAddress}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style = {styles.balance}>
                <Text>$ 55.55</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View>
                <Text style = {{color:"white", textAlign:"center", fontSize:25, backgroundColor:"#222127", borderColor:"#333333", borderRadius:10, borderWidth:1,}}>Do you want to go to Explorer ?</Text>
                <View style = {{flexDirection:"row", marginTop:50,}}>
                    <View style = {{width:"40%", marginLeft:"5%"}}>
                    <Button title="YES" onPress={openExplorer} />
                    </View>
                    <View style = {{width:"40%", marginLeft:"10%"}}>
                    <Button title="CANCEL" onPress={toggleModal} />
                    </View>
                </View>
                </View>
            </Modal>
        </View>
        <View style = {{marginTop:20}}>
            <Image source = {require('../assets/avatar.png')} style={{ width: 80, height: 80, }} />
            <Text style = {{textAlign:'center'}}>{profileName}</Text>
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
  );
}

const styles = StyleSheet.create({
    container :{
        // flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
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
})