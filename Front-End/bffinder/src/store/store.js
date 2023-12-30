// Import Redux functions
import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from './post';
import { authSlice } from './auth';

export const store = configureStore({
    reducer: {
        posts: postSlice.reducer,
        auth: authSlice.reducer,
    },
});
