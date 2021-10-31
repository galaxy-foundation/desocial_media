import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Clipboard, Image, AsyncStorage } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
// import "react-native-get-random-values"
// import unorm from 'unorm';
// String.prototype.normalize = function(form) {
//   var func = unorm[(form || 'NFC').toLowerCase()];
//   if (!func) {
//     throw new RangeError('invalid form - ' + form);
//   }
//   return func(this);
// };
// import "@ethersproject/shims"
import { ethers } from 'ethers';
// import * as Random from 'expo-random';
// import { polyfillWebCrypto } from 'expo-standard-web-crypto';
// import { generateSecureRandom } from 'react-native-securerandom';




export default function MnemonicCopyScreen({ navigation }) {
//   polyfillWebCrypto();
//   crypto.getRandomValues
//   window.crypto.getRandomValues = function(array) {
//     const random = generateSecureRandom(array.length);
//     for (let i = 0; i < array.length; i++) { array[i] = random[i]; }
// };
    const [copiedText, setCopiedText] = useState('')
    const [copiedTextView, setCopiedTextView] = useState(false)
    const [storedPhrase, setStoredPhrase] = useState('')
	  const [storedPublicKey, setStoredPublicKey] = useState('')
    const wallet = ethers.Wallet.createRandom()
    

    //   console.log('address:', wallet.address)
    //   console.log('mnemonic:', wallet.mnemonic.phrase)
    //   console.log('privateKey:', wallet.privateKey)
    //   const phrase = "middle pride coil impulse interest sand pizza supply vital diagram margin vally stomach avocado zoo visit eagle fortune unk rescue yard spring gown cause"
	useEffect(() => {
		const runInit = async ()=>{
			await AsyncStorage.setItem("desocial@0313/phrase",wallet.mnemonic.phrase)
			await AsyncStorage.setItem("desocial@0313/publicKey",wallet.address)
      await AsyncStorage.setItem("desocial@0313/privateKey",wallet.privateKey)
      await AsyncStorage.setItem("desocial@0313/userName",'')
      await AsyncStorage.setItem("desocial@0313/userGender",'')
      await AsyncStorage.setItem("desocial@0313/userEmail",'')
      await AsyncStorage.setItem("desocial@0313/userInstagram",'')
      await AsyncStorage.setItem("desocial@0313/userLinkedin",'')
      await AsyncStorage.setItem("desocial@0313/userPhone",'')
      await AsyncStorage.setItem("desocial@0313/uri", '')
      await AsyncStorage.setItem("desocial@0313/profilePhoto", '')
			const storedPhraseData = await AsyncStorage.getItem("desocial@0313/phrase")
			setStoredPhrase(storedPhraseData)
			const storedPublicKeyData = await AsyncStorage.getItem("desocial@0313/publicKey")
			setStoredPublicKey(storedPublicKeyData)
		}
    	runInit();
	}, []);
    const copyToClipboard = () => {
        Clipboard.setString(storedPhrase)
        setCopiedTextView(true)
        alert(storedPublicKey)
		console.log(storedPhrase)
		console.log(storedPublicKey)
      }
      const fetchCopiedText = async () => {
		alert(storedPublicKey)
		console.log(storedPhrase)
		console.log(storedPublicKey)
        const text = await Clipboard.getString()
        if(Clipboard!==null){ 
          setCopiedText(text)
        }else
        {
          setCopiedText("No copied!")
        }
      }
  return (
    <Background>
      <Logo />
      <Header>Secret Authentication Phrase</Header>
      <Text style = {styles.title}>Save them somewhere safe and secret.</Text>
      <Text style = {styles.warning}> ! DO NOT share this phrase with anyone for secret.</Text>
      <View style = {styles.phrase}>
        <Text>* Your private Secret Recovery Phrase</Text>
        <Text style = {styles.mnemonic}>{storedPhrase}</Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text style = {styles.copy_button}>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <Text style={styles.copiedText}>{copiedText}</Text>
        <View style={copiedTextView===true?styles.row:styles.hidden}>
          <TouchableOpacity onPress={() => fetchCopiedText()} style={styles.copiedTextView}>
            <Text style = {{textAlign:'center', color:"white"}}>View Copied Text</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.logInButton}>
            <Text style = {{textAlign:'center', color:"white"}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
    title: {
    color: '#404040',
    marginBottom: 12,
  },
  warning: {
    color:'red',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 6,
    padding: 10,
  },
  phrase: {
    marginTop: 12,
  },
  mnemonic: {
    textAlign: 'center',
    borderWidth: 0.5,
    backgroundColor: "#99ebff",
    padding: 12,
    marginTop: 5,
  },
  copy_button: {
    marginTop: 18,
    borderWidth: 1,
    width: "80%",
    marginLeft: "10%",
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
  },
  copiedText:{
    textAlign: 'center',
    marginTop: 6,
  },
  copiedTextView: {
    width:"40%",
    // alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    backgroundColor:"#404040",
    borderColor:"#404040",
  },
  logInButton: {
    width:"40%",
    // alignItems: "flex-end",
    borderWidth: 1,
    marginLeft: "20%",
    borderRadius: 5,
    padding: 6,
    marginTop: 10,
    backgroundColor: "black",

  },
  row: {
    flexDirection: "row",
  },
  hidden: {
    display: "none",
  },
})
