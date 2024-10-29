import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userData: {
		id: '',
		email: '',
		name: '',
		role: 0, //1일반 2어드민
		image: '',
	},
	isAuth: false,
	isLoading: false,
	error: '',
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
	},
});

export default userSlice.reducer;