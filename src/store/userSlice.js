import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios.js';
import { toast } from 'react-toastify';

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

export const loginUser = createAsyncThunk('user/loginUser', async (arg, thunkAPI) => {
		try {
			const res = await axiosInstance.post('/users/login', arg);
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
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state, action) => {
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				toast.info('회원가입을 성공했습니다.');
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action?.payload;
				toast.error(action?.payload);
			})
			.addCase(loginUser.pending, (state, action) => {
			}).
			addCase(loginUser.fulfilled, (state, action) => {
				state.userData = action.payload;
				state.isAuth = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
			})
		;
	},
});

const loadingMiddleware = (store) => (next) => (action) => {
	if(action.type.endsWith('/pending')){
		store.dispatch(userSlice.actions.setLoading(true))
	} else {
		store.dispatch(userSlice.actions.setLoading(false))
	}
	return next(action);
}

export const {
	setLoading,

} = userSlice.actions;

export default userSlice.reducer;