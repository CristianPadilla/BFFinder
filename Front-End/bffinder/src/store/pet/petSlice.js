import { createSlice } from '@reduxjs/toolkit';

export const petSlice = createSlice({
    name: 'pet',
    initialState: {
        isSaving: false,
        messageSaved: '',
        pets: [],
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
        addNewPet(state, { payload }) {
            // state.isSaving = true;
            // state.messageSaved = '';
        },
        setActivePet(state, action) {

        },
        setPets(state, { payload }) {
        },
        setSavingPet(state, { payload }) {
        },
        updatePet(state, { payload }) {
        },
        deletePetById(state, { payload }) {
        }
    },
});

export const {
    addNewPet,
    setActivePet,
    setPets,
    setSavingPet,
    updatePet,
    deletePetById,
} = petSlice.actions;
