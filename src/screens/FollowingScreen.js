 import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

import { useSelector, useDispatch} from 'react-redux';
import slice from '../../reducer';

export default function FollowingScreen({navigation}) {
	const G = useSelector(state => state);
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));
	const [status, setStatus] = useState({
		articles: [],
		count: 0,
	});
	useEffect(() => {
		(async () => {
			const postsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount")
			var count = 0;
			const articles = [];
			for(let i = 1; i<=postsAmount;i++){
				const storedArticles = await AsyncStorage.getItem("desocial@0313/article"+i);
				const storedArticle = JSON.parse(storedArticles)
				if(Number(storedArticle[6])>0){
					count+=1;
					console.log(count)
					articles.push(storedArticle)
					setStatus({articles, count})
				}			
			}
			
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
		
	}, []);

	const viewPost  = (currentPage) => {
		update({currentPage})
		navigation.navigate("PostedViewScreen")
	}
	return (
		<View>
			<Text style = {{color:"black", fontSize:20, zIndex:1,marginTop:-40, marginLeft:120,}}>({status.count})</Text>
			<ScrollView>
				{status.count!==0?
					<View style = {{marginTop:20,}}>
						{status.articles.map((v,k)=>(
							<TouchableOpacity style = {{flexDirection:"row", marginHorizontal:20, padding:10,borderBottomColor:"lightgrey", borderBottomWidth:0.3,}} onPress = {()=>viewPost(Number(k)+1)} key = {k}>
									<View>
										<Image source = {{uri:v[1]}} style = {{width:50, height:40}} />
									</View>
									<View style = {{marginLeft:20,}}>
										<Text style = {{fontSize:15,}}>
											{v[0].length<25?
												v[0]:
												v[0].slice(0, 25)+"..."
												}
										</Text>
										<View style = {{flexDirection:"row"}}>
											<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
											<Text style = {{fontSize:10, color:"grey"}}>{v[3]}</Text>
										</View>
									</View>
							</TouchableOpacity>
						))}
					</View>:
					<View style = {{marginTop:"20%", alignItems: 'center', justifyContent: 'center' ,}}>
						<Image source = {require("../assets/items.png")} />
						<View style = {{alignItems:"center", marginTop:-30}}>
							<Text style={{ color:"#737373", }}>NO ITEMS</Text>
						</View>
					</View>
				}
			</ScrollView>
		</View>
	);
}