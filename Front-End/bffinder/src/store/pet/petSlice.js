import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    messageSaved: '',
    page: null,
    active: null,
    petsRequest: {
        search: "",
        size: "",
        specie_id: 0,
        breed_id: 0,
        age: 0,
        gender: "",
        vaccinated: null,
        sterilized: null,
        dewormed: null,
        posted: null,
        sort: "",
        desc: false,
        page: 0,
        page_size: 2,
    },
    species: [],
    breeds: [],
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
}

export const petSlice = createSlice({
    name: 'pets',
    initialState: initialState,
    reducers: {
        savingNewPet(state) {
            state.isSaving = true;
        },
        setActivePet(state, action) {
            state.active = action.payload;
        },
        setPetsPage(state, { payload }) {
            state.page = payload.page;
            state.petsRequest = payload.petsRequest;
        },
        setSavingPet(state, { payload }) {
        },
        updatePet(state, { payload }) {
        },
        deletePetById(state, { payload }) {
        },
        setPetsRequest(state, { payload }) {
            const filter = Object.keys(payload)[0];
            const value = Object.values(payload)[0];
            state.petsRequest[filter] = value;
        },
        clearPetsLogout(state) {
            state.isSaving = false;
            state.messageSaved = '';
            state.active = null;
            state.page = null;
            state.petsRequest = initialState.petsRequest;

        },
        setSpecies(state, { payload }) {
            state.species = payload;
        },
        setBreeds(state, { payload }) {
            state.breeds = payload;
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
    setPetsRequest,
    clearPetsLogout,
    setSpecies,
    setBreeds,
} = petSlice.actions;
