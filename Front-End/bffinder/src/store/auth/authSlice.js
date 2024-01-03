import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'not-authenticated', 'checking', 'authenticated   
        isAuthenticated: false,
        token: null,
        userId: null,
        email: null,
        name: null,
        photoUrl: null,
        role: null,
        errorMessage: null,
    },
    reducers: {
        login(state, { payload }) {
            state.status = 'authenticated';
            state.isAuthenticated = true;
            state.token = payload.token;
            state.userId = payload.userId;
            state.email = payload.email;
            state.name = payload.name + (payload.role === 's' ? "" : " " + payload.lastname);
            state.photoUrl = payload.photoUrl;
            state.role = payload.role;
            state.errorMessage = null;
        },
        logout(state, { payload }) {
            state.status = 'not-authenticated';
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            state.email = null;
            state.name = null;
            state.photoUrl = null;
            state.role = null;
            state.errorMessage = payload != null ? payload.errorMessage : null;
        },
        checkingCredentials(state) {
            state.status = 'checking';
        },
        registerUser(state, { payload }) {
            state.isAuthenticated = true;
            state.user = action.payload;
        }
    },
});

export const { login, logout, checkingCredentials, registerUser } = authSlice.actions;

