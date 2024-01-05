import { createSlice } from '@reduxjs/toolkit';


export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        activeModule: 'posts'
    },
    reducers: {
        setActiveModule(state, { payload }) {
            console.log("setActiveModule from slice ", payload.module);
            state.activeModule = payload.module;
        },
    },
});

export const { setActiveModule } = globalSlice.actions;

