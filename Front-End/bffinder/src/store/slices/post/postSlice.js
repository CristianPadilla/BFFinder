import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'posts',
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

        posts: [],
        loading: false,
    },
    reducers: {
        fetchPostsStart(state) {
            state.loading = true;
            // state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.pageable.pageNumber = action.payload.number;
            state.posts = action.payload.posts;
            console.log("action: ", action.payload);
            // console.log("state: ", state);
        }
    },
});

export const { fetchPostsStart, fetchPostsSuccess } = postSlice.actions;
