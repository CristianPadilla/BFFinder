import { createSlice } from '@reduxjs/toolkit';

export const petSlice = createSlice({
    name: 'pets',
    initialState: {
        isSaving: false,
        // loading: false,
        messageSaved: '',
        page: {
            pageNumber: 0,
            pageSize: 10,
            numberOfElements: 0,
            totalPages: 0,
            totalElements: 0,
            offset: 0,
            last: false,
            first: true,
            sort: '',
            desc: false,
            pets: [],
        },
        active: null,
        // active: {
        //     id: null,
        //     name: null,
        //     weight: 0,
        //     age: 0,
        //     vaccinated: false,
        //     dangerous: false,
        //     size: null,
        //     sterilized: false,
        //     dewormed: false,
        //     picture: null,
        //     owner: {
        //         id: null,
        //         name: null,
        //         phone: null,
        //     },
        //     breed: {
        //         id: null,
        //         name: null,
        //         specie: {
        //             id: null,
        //             name: null,
        //         }
        //     },
        //     published: null,
        // }
    },
    reducers: {
        savingNewPet(state) {
            state.isSaving = true;
            // state.loading = true;
        },
        setActivePet(state, action) {
            state.active = action.payload;
            // state.loading = false;
        },
        setPetsPage(state, { payload }) {
            // console.log("========== setPetsPage from slice ", payload);
            state.page = payload.page;
        },
        setSavingPet(state, { payload }) {
        },
        updatePet(state, { payload }) {
        },
        deletePetById(state, { payload }) {
        },
        setErrorMessage(state, { payload }) {
            state.messageSaved = payload;
        },
    },
});

export const {
    savingNewPet,
    setActivePet,
    setPetsPage,
    setSavingPet,
    updatePet,
    deletePetById,
    setErrorMessage,
} = petSlice.actions;
