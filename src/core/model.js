import { AsyncStorage} from 'react-native';

export const setPassword = async (newPassword) => {
	await AsyncStorage.setItem("desocial@0313/password", newPassword)
}
export const updatePassword = setPassword

export const initialAccount = async (mnemonic, address, privateKey) => {
	await AsyncStorage.setItem("desocial@0313/phrase",  mnemonic)
	await AsyncStorage.setItem("desocial@0313/publicKey", address)
	await AsyncStorage.setItem("desocial@0313/privateKey", privateKey)
	
	await AsyncStorage.setItem("desocial@0313/userName",'')
	await AsyncStorage.setItem("desocial@0313/userGender",'')
	await AsyncStorage.setItem("desocial@0313/userEmail",'')
	await AsyncStorage.setItem("desocial@0313/userInstagram",'')
	await AsyncStorage.setItem("desocial@0313/userLinkedin",'')
	await AsyncStorage.setItem("desocial@0313/userPhone",'')
	await AsyncStorage.setItem("desocial@0313/profilePhoto", 'anonymous')
	await AsyncStorage.setItem("desocial@0313/postsAmount", '0')
	await AsyncStorage.setItem("desocial@0313/article", JSON.stringify([]))
	await AsyncStorage.setItem("desocial@0313/followingStatu", '0')
}

export const getWallet = async () => {
	const mnemonic = 	await AsyncStorage.getItem("desocial@0313/phrase")
	const address = 	await AsyncStorage.getItem("desocial@0313/publicKey")
	const privateKey = 	await AsyncStorage.getItem("desocial@0313/privateKey")

	return{
		mnemonic,
		address,
		privateKey,
	}
}

export const getProfile = async () => {
	const avatar = 		await AsyncStorage.getItem("desocial@0313/profilePhoto") || 'anonymous'
	const fullName = 	await AsyncStorage.getItem("desocial@0313/userName") || ''
	const gender = 		await AsyncStorage.getItem("desocial@0313/userGender") || ''
	const email = 		await AsyncStorage.getItem("desocial@0313/userEmail") || ''
	const instagram = 	await AsyncStorage.getItem("desocial@0313/userInstagram") || ''
	const linkedin = 	await AsyncStorage.getItem("desocial@0313/userLinkedin") || ''
	const phone = 		await AsyncStorage.getItem("desocial@0313/userPhone") || ''

	const account = 	await AsyncStorage.getItem("desocial@0313/publicKey") || ''

	const postsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount")
	const followingStatu = Number(await AsyncStorage.getItem("desocial@0313/followingStatu")) || 0
	const buf = 		await AsyncStorage.getItem("desocial@0313/article")
	const article = 	buf ? JSON.parse(buf) : [];

	return {
		avatar,
		fullName,
		gender,
		email,
		instagram,
		linkedin,
		phone,

		account,

		postsAmount,
		article,
		followingStatu,
	}
}

export const setProfile = async ({avatar, fullName, gender, email, instagram, linkedin, phone}) => {
	if (avatar!=undefined) 		await AsyncStorage.setItem("desocial@0313/profilePhoto",    avatar)
	if (fullName!=undefined) 	await AsyncStorage.setItem("desocial@0313/userName",        fullName)
	if (gender!=undefined) 		await AsyncStorage.setItem("desocial@0313/userGender",      gender)
	if (email!=undefined) 		await AsyncStorage.setItem("desocial@0313/userEmail",       email)
	if (instagram!=undefined) 	await AsyncStorage.setItem("desocial@0313/userInstagram",   instagram)
	if (linkedin!=undefined) 	await AsyncStorage.setItem("desocial@0313/userLinkedin",    linkedin)
	if (phone!=undefined) 		await AsyncStorage.setItem("desocial@0313/userPhone",       phone)
}

export const validatePassword = async (password) => {
	const storagePassword = await AsyncStorage.getItem("desocial@0313/password")
	return password===storagePassword
}