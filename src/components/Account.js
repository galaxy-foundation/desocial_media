import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Clipboard, AsyncStorage, TouchableOpacity, Text, Button, Linking, Image } from 'react-native'
import Modal from "react-native-modal";

export default function Account () {

    const [shownAddress, setShownAddress] = useState("")
    const [address, setAddress] = useState("")
    const [isModalVisible, setModalVisible] = useState(false);
    const [accountPhoto, setAccountPhoto] = useState('')
    useEffect(() => {
        const runInit = async () => {
            const publicKey = await AsyncStorage.getItem("desocial@0313/publicKey")
            setAddress(publicKey)
            const shownAddress = publicKey.slice(0,5) + " ..."+ publicKey.slice(-2)
            setShownAddress(shownAddress)
            const profilePhoto = await AsyncStorage.getItem("desocial@0313/profilePhoto")
            setAccountPhoto(profilePhoto)
        }
        runInit();
    }, []);

    const copyToClipboard = async () => {
        Clipboard.setString(address)
        alert("Copied to clipboard !"+'\n'+'\n'+address)
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openExplorer = () => {
        setModalVisible(!isModalVisible);
        Linking.openURL("https://bscscan.com/address/"+ `${address}`)
    }
    return (
        <View style = {styles.row}>
            <TouchableOpacity onPress={() => copyToClipboard()} style = {styles.address}>
                <Text>{shownAddress}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style = {styles.balance}>
                <Text>$ 55.55</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View>
                <Text style = {{color:"white", textAlign:"center", fontSize:25, backgroundColor:"#222127", borderColor:"#333333", borderRadius:10, borderWidth:1,padding: 20,}}>Do you want to go to Explorer ?</Text>
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
            {accountPhoto?
                <TouchableOpacity>
                    <Image source={{uri:accountPhoto}} style = {{width:30, height:30, borderRadius:15,borderWidth:0.5, borderColor:"blue"}} />
                </TouchableOpacity>:
                <TouchableOpacity>
                    <Image source={require("../assets/avatarrandom.png")} style = {{width:30, height:30, borderRadius:15,borderWidth:0.5, borderColor:"blue"}} />
                </TouchableOpacity>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    row :{
        flexDirection : "row",
        marginTop: 40,
        borderBottomWidth:0.5,
        borderBottomColor:"#d9d9d9",
        paddingBottom:5,
    },
    address :{
        width: "50%",
        alignItems: "center",
    },
    balance :{
        width: "30%",
        alignItems: "center",
    },
})