import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: null,
    active: null,
    pendingShelters: null, // provisionalmnte en este slice
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
            state.pendingShelters = null;
        },
        setPendingShelters(state, { payload }) {
            state.pendingShelters = payload;
        },
    }
},);

export const {
    setQuestions,
    cleanQuestions,
    setActive,
    clearQuestionsLogout,
    setPendingShelters
} = questionSlice.actions;

