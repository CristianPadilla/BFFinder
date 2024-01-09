import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    messageSaved: '',
    active: null,
    page: null,
    postRequest: {
        search: "",
        filters: {
            from_date: "",
            specie_id: 0,
            breed_id: 0,
            size: '',
            department_id: 0,
            city_id: 0,
            status: '',
        },
        sorting: {
            sort: "",
            desc: false
        },
        page: 0,
        page_size: 2,
    },
}

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        fetchPostsStart(state) {
        },
        fetchPostsSuccess(state, { payload }) {
            state.page = payload.page;
            state.postRequest = payload.postRequest;
        },
        setPostsRequest(state, { payload }) {
            const filter = Object.keys(payload)[0];
            const value = Object.values(payload)[0];
            if (filter === 'page') {
                console.log("aplicando filtro de page", filter, value);
                state.postRequest[filter] = value;
            } else if (filter === 'sort' || filter === 'desc') {
                console.log("aplicando filtro de sorting", filter, value);
                state.postRequest.sorting[filter] = value;
            } else {
                console.log("aplicando filtro normal", filter, value);
                state.postRequest.filters[filter] = value;
            }
        },
        clearPostsLogout(state) {
            state.isSaving = false;
            state.messageSaved = '';
            state.active = null;
            state.page = null;
            state.postRequest = initialState.postRequest;

        },
    },
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    setPostsRequest,
    clearPostsLogout,
} = postSlice.actions;
