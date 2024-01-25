import { createSlice } from '@reduxjs/toolkit';


export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        activeModule: 'posts',
        contentLoading: false,
        department_location: null,
        city_location: null,
    },
    reducers: {
        setActiveModule(state, { payload }) {
            state.activeModule = payload.module;
        },
        clearGlobalLogout(state) {
            state.contentLoading = true;
            // state.department_location = null;
            // state.city_location = null;
        },
        startContentLoading(state) {
            state.contentLoading = true;
        },
        stopContentLoading(state) {
            state.contentLoading = false;
        },
        setLocation(state, { payload }) {
            // console.log("setLocation from globalSlice ", payload.department, payload.city);
            state.department_location = payload.department;
            if (payload.city === "Bogotá") state.city_location = "Bogotá D.C.";
            else state.city_location = payload.city;

        }
    },
});

export const {
    setActiveModule,
    clearGlobalLogout,
    startContentLoading,
    stopContentLoading,
    setLocation
} = globalSlice.actions;

