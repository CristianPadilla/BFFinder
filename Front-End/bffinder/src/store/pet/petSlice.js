import { createSlice } from '@reduxjs/toolkit';

export const petSlice = createSlice({
    name: 'pets',
    initialState: {
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            numberOfElements: 0,
            totalPages: 0,
            totalElements: 0,
            offset: 0,
            last: false,
            first: true,
            sort: {
                sort: '',
                desc: false,
            },
        },
        pets: [],
        loading: false,
    },
    reducers: {
        fetchPetsStart(state) {
            state.loading = true;
        },
        fetchPetsSuccess(state, action) {
            console.log("payload from slice: ", action.payload);
            state.loading = false;
            state.pageable.pageNumber = action.payload.number;
            state.pets = action.payload.pets;
            // console.log("state: ", state);
        }
        // addNewPet(state, { payload }) {
        //     // state.isSaving = true;
        //     // state.messageSaved = '';
        // },
        // setActivePet(state, action) {

        // },
        // setPets(state, { payload }) {
        // },
        // setSavingPet(state, { payload }) {
        // },
        // updatePet(state, { payload }) {
        // },
        // deletePetById(state, { payload }) {
    },
});

// export const {
//     addNewPet,
//     setActivePet,
//     setPets,
//     setSavingPet,
//     updatePet,
//     deletePetById,
// } = petSlice.actions;
export const { fetchPetsStart, fetchPetsSuccess } = petSlice.actions;
