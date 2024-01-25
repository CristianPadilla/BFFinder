import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: null,
    active: null,
    // loading: false,
    // error: null,
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestions(state, { payload }) {
            state.questions = payload;
        },

        cleanQuestions(state, { payload }) {
            state.questions = [];
        },
        setActive(state, { payload }) {
            state.active = payload;
        },
        clearQuestionsLogout(state) {
            state.questions = null;
            state.active = null;
        },
    },
});

export const {
    setQuestions,
    cleanQuestions,
    setActive,
    clearQuestionsLogout
} = questionSlice.actions;

