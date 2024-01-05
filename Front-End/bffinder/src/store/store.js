// Import Redux functions
import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from './post';
import { authSlice } from './auth';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { petSlice } from './pet';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authSlice.reducer,
})

const authPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        posts: postSlice.reducer,
        pets: petSlice.reducer,
        // auth: authSlice.reducer,
        auth: authPersistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk)
});
