import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios.js';

export const registerUser = createAsyncThunk('user/registerUser', async (arg, thunkAPI) => {
		try {
			const res = await axiosInstance.post('/users/register', arg);
			return res.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data || error.message);
		}
	},
);

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
	reducers: {
		initUserDate: (state, action) => {
			state.userData = {
				id: '',
				email: '',
				name: '',
				role: 0, //1일반 2어드민
				image: '',
			};
			state.isAuth = false;
			
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				console.log('action?.payload', action);
				state.error = action?.payload;
			});
	},
});

export default userSlice.reducer;