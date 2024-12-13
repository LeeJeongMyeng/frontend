import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer,{ setLoading } from './userSlice.js';
import storage from 'redux-persist/lib/storage';
import { REHYDRATE, FLUSH, PERSIST, PAUSE, persistReducer, persistStore } from 'redux-persist';

//모든 비동기작업 대해서 isLoading 상태를 관리하기엔 코드 중복임.
//모든 작업 시에 도작하도록 공통 코드로 작성함.
const loadingMiddleware = (store) => (next) => (action) => {
	//setLoading 제외함 아니면 무한루프임.
	if(action.type === 'user/setLoading') {
		return next(action);
	}

	if(action.type.endsWith('/pending')){
		store.dispatch(setLoading(true));
	} else {
		store.dispatch(setLoading(false));
	}
	return next(action);
}

export const rootReducer = combineReducers({
	user: userReducer,
	
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST],
		},
	}).concat(loadingMiddleware),
});



export const persistor = persistStore(store);
