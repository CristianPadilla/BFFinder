import { createSlice } from '@reduxjs/toolkit';


export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        activeModule: 'posts',
        contentLoading: false,
    },
    reducers: {
        setActiveModule(state, { payload }) {
            state.activeModule = payload.module;
        },
        clearGlobalLogout(state) {
            state.contentLoading = true;
        },
        startContentLoading(state) {
            state.contentLoading = true;
        },
        stopContentLoading(state) {
            state.contentLoading = false;
        },
    },
});

export const {
    setActiveModule,
    clearGlobalLogout,
    startContentLoading,
    stopContentLoading
} = globalSlice.actions;

