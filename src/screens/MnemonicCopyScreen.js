import React, { useState } from 'react'
import { ethers } from 'ethers';
import { View, StyleSheet, TouchableOpacity, Clipboard, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'

export default function MnemonicCopyScreen({ navigation }) {
    const [copiedText, setCopiedText] = useState('')
    const [copiedTextView, setCopiedTextView] = useState('')


    // const ethers = require('ethers')
      // const wallet = ethers.Wallet.createRandom()

//       console.log('address:', wallet.address)
// console.log('mnemonic:', wallet.mnemonic.phrase)
// console.log('privateKey:', wallet.privateKey)
    const phrase = "middle pride coil impulse interest sand pizza supply vital diagram margin vally stomach avocado zoo visit eagle fortune unk rescue yard spring gown cause"
    const copyToClipboard = () => {
        Clipboard.setString(phrase)
        setCopiedTextView("View Copied Text")
      }
      const fetchCopiedText = async () => {
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
        <Text style = {styles.mnemonic}>{phrase}</Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text style = {styles.copy_button}>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <Text style={styles.copiedText}>{copiedText}</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => fetchCopiedText()} style={styles.copiedTextView}>
            <Text style = {{textAlign:'center', color:"white"}}>{copiedTextView}</Text>
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
    marginTop: 8,
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
})
