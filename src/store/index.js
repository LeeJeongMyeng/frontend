import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import storage from 'redux-persist/lib/storage';
import { REHYDRATE, FLUSH, PERSIST, PAUSE, persistReducer, persistStore } from 'redux-persist';

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
	}),
});

export const persistor = persistStore(store);
