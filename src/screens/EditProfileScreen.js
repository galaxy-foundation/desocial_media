import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Clipboard, Image, Linking} from 'react-native';
import { TextInput } from 'react-native-paper';
import BackButton from '../components/BackButton'

export default function EditProfileScreen({navigation}) {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [phone, setPhone] = useState('')
    
    useEffect (() => {
        const runInit = async () => {
            const storedUserName = await AsyncStorage.getItem("desocial@0313/userName")
            const storedGender = await AsyncStorage.getItem("desocial@0313/userGender")
            const storedEmail = await AsyncStorage.getItem("desocial@0313/userEmail")
            const storedInstagram = await AsyncStorage.getItem("desocial@0313/userInstagram")
            const storedLinkedin = await AsyncStorage.getItem("desocial@0313/userLinkedin")
            const storedPhone = await AsyncStorage.getItem("desocial@0313/userPhone")
            setFullName(storedUserName)
            setGender(storedGender)
            setEmail(storedEmail)
            setInstagram(storedInstagram)
            setLinkedin(storedLinkedin)
            setPhone(storedPhone)
        }
        runInit();
    }, [])
    const submitProfile = async () => {
        const storedUserName = await AsyncStorage.getItem("desocial@0313/userName")
        const storedGender = await AsyncStorage.getItem("desocial@0313/userGender")
        const storedEmail = await AsyncStorage.getItem("desocial@0313/userEmail")
        const storedInstagram = await AsyncStorage.getItem("desocial@0313/userInstagram")
        const storedLinkedin = await AsyncStorage.getItem("desocial@0313/userLinkedin")
        const storedPhone = await AsyncStorage.getItem("desocial@0313/userPhone")
        if(!fullName){
            setFullName(storedUserName)
        }else{
            await AsyncStorage.setItem("desocial@0313/userName",fullName)
        }
        if(!gender){
            setGender(storedGender)
        }else{
            await AsyncStorage.setItem("desocial@0313/userGender",gender)
        }
        if(!email){
            setEmail(storedEmail)
        }else{
            await AsyncStorage.setItem("desocial@0313/userEmail",email)
        }
        if(!instagram){
            setInstagram(storedInstagram)
        }else{
            await AsyncStorage.setItem("desocial@0313/userInstagram",instagram)
        }
        if(!linkedin){
            setLinkedin(storedLinkedin)
        }else{
            await AsyncStorage.setItem("desocial@0313/userLinkedin",linkedin)
        }
        if(!phone){
            setPhone(storedPhone)
        }else{
            await AsyncStorage.setItem("desocial@0313/userPhone",phone)
        }
        navigation.navigate('Dashboard')
    }
    return(
        <View>
            <View style = {styles.topBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Image style={styles.image} source={require('../assets/arrow_back.png')}/>
                </TouchableOpacity>
                <Text style = {styles.topBarText}>Edit Profile</Text>
                <TouchableOpacity onPress={submitProfile} style = {{marginLeft:"45%"}}>
                    <Image style={styles.submitIcon} source={require('../assets/correct.png')}/>
                </TouchableOpacity>
            </View>
            <View style = {{marginTop:30, alignItems:"center"}}>
                <Image source = {require('../assets/avatar.png')} style={{ width: 80, height: 80 }} />
                <Text style = {{fontSize:20}}>Change Profile Photo</Text>
            </View>
            <View style = {{marginTop:30, marginLeft:15}}>
                <View style = {{flexDirection:"row"}}>
                    <Text style={styles.profileheadtext}>*Fullname</Text>
                    <TextInput 
                        label = 'Fullname'
                        value = {fullName}
                        onChangeText = {fullname => setFullName(fullname)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
                <View style = {{flexDirection:"row", marginTop:10}}>
                    <Text style={styles.profileheadtext}>*Gender</Text>
                    <TextInput 
                        label = 'Gender'
                        value = {gender}
                        onChangeText = {gender => setGender(gender)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
                <View style = {{flexDirection:"row", marginTop:10}}>
                    <Text style={styles.profileheadtext}>*E-mail</Text>
                    <TextInput 
                        label = 'e-mail'
                        value = {email}
                        onChangeText = {email => setEmail(email)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
                <View style = {{flexDirection:"row", marginTop:10}}>
                    <Text style={styles.profileheadtext}>*Instagram Link</Text>
                    <TextInput 
                        label = 'YourLink'
                        value = {instagram}
                        onChangeText = {instagram => setInstagram(instagram)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
                <View style = {{flexDirection:"row", marginTop:10}}>
                    <Text style={styles.profileheadtext}>*Linkedin Link</Text>
                    <TextInput 
                        label = 'YourLink'
                        value = {linkedin}
                        onChangeText = {linkedin => setLinkedin(linkedin)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
                <View style = {{flexDirection:"row", marginTop:10}}>
                    <Text style={styles.profileheadtext}>*Phone number</Text>
                    <TextInput 
                        label = 'PhoneNumber'
                        value = {phone}
                        onChangeText = {phone => setPhone(phone)}
                        style={styles.profileinputfield}
                        mode="outlined"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 24,
      height: 24,
      marginLeft:15,
    },
    topBar: {
        flexDirection:"row",
        marginTop: 30,
    },
    topBarText: {
        marginLeft:15,
        fontSize: 20,
    },
    submitIcon: {
        width: 24,
        height: 24,
    },
    profileheadtext: {
        width:"30%"
    },
    profileinputfield: {
        width:"60%", 
        height:40,
    }
  })
  