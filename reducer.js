import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: 0,
    avatar: 'anonymous',
    fullName: '',
    gender: '',
    email: '',
    instagram: '',
    linkedin: '',
    phone: '',
    postsAmount: 0,
    article: [],
    followingStatu: false,
}

export default createSlice({
	name: 'bridge',
	initialState,
	reducers: {
		update: (state, action) => {
			for (const k in action.payload) {
				if (state[k] === undefined) new Error('# undefined key')
				state[k] = action.payload[k]
			}
		}
	}
})
