import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
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
            posts: null,
        },
        postRequest: {
            search: "",
            filters: {
                from_date: "",
                specie_id: 0,
                breed_id: 0,
                size: '',
                department_id: 0,
                city_id: 0
            },
            sorting: {
                sort: "",
                desc: false
            },
            page: 0,
            page_size: 2,
        },
    },
    reducers: {
        fetchPostsStart(state) {
            state.loading = true;
        },
        fetchPostsSuccess(state, { payload }) {
            state.page = payload.page;
            state.loading = false;
        },
        setPostsRequest(state, { payload }) {
            const filter = Object.keys(payload)[0];
            const value = Object.values(payload)[0];
            console.log("==== setPostsRequest from slice ", filter, value);
            state.postRequest[filter] = value;
        },
    },
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    setPostsRequest
} = postSlice.actions;
