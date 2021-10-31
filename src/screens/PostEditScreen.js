import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";


const PostEditScreen = ({navigation}) => {
    const strikethrough = require("../assets/strikethrough.png"); //icon for strikethrough
    const video = require("../assets/video.png"); //icon for Addvideo
    const RichText = useRef(); //reference to the RichEditor component
    const [article, setArticle] = useState("");
    // this function will be called when the editor has been initialized
    function editorInitializedCallback() {
      RichText.current?.registerToolbar(function (items) {
        // items contain all the actions that are currently active
        console.log(
          "Toolbar click, selected items (insert end callback):",
          items
        );
      });
    }
    function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }

    const saveArticle = () => {
        return
    }
    return (
        <View>
            <View style = {styles.topBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Image style={styles.image} source={require('../assets/arrow_back.png')}/>
                </TouchableOpacity>
                <Text style = {styles.topBarText}>Write New Article</Text>
                <TouchableOpacity onPress={saveArticle} style = {{marginLeft:"25%"}}>
                    <Text style = {{fontSize:15,borderWidth:1, borderRadius:5, borderColor:"#333434", paddingHorizontal:8, paddingVertical:4, color:"white", backgroundColor:"#333333"}}>Post</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Draft for new article...</Text>
                <RichEditor
                    disabled={false}
                    containerStyle={styles.editor}
                    ref={RichText}
                    style={styles.rich}
                    placeholder={"Your title"}
                    onChange={(text) => setArticle(text)}
                    editorInitializedCallback={editorInitializedCallback}
                    onHeightChange={handleHeightChange}
                />
                <RichToolbar
                    style={[styles.richBar]}
                    editor={RichText}
                    disabled={false}
                    iconTint={"purple"}
                    selectedIconTint={"pink"}
                    disabledIconTint={"purple"}
                    onPressAddImage={onPressAddImage}
                    iconSize={40}
                    actions={[
                    "insertVideo",
                    ...defaultActions,
                    actions.setStrikethrough,
                    actions.heading1,
                    ]}
                    // map icons for self made actions
                    iconMap={{
                    [actions.heading1]: ({ tintColor }) => (
                        <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                    ),
                    [actions.setStrikethrough]: strikethrough,
                    ["insertVideo"]: video,
                    }}
                    insertVideo={insertVideo}
                />
                <Text style={styles.text}>Result</Text>
                <HTMLView value={article} stylesheet={styles} />
            </ScrollView>
        </View>
    );
  }


export default PostEditScreen;
  const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
        marginLeft:15,
      },
      topBar: {
          flexDirection:"row",
          marginTop: 40,
      },
      topBarText: {
          marginLeft:15,
          fontSize: 20,
      },
      submitIcon: {
          width: 24,
          height: 24,
      },
  })