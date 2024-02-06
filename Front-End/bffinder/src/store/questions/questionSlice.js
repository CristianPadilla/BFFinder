import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: null,
    active: null,
    pendingShelters: null, // provisionalmnte en este slice
    pendingQuestionsCount: 0,
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
            state.pendingQuestionsCount = 0;
        },
        setPendingShelters(state, { payload }) {
            state.pendingShelters = payload;
        },
        setPendingQuestionsCount(state, { payload }) {
            state.pendingQuestionsCount = payload;
        }
    }
},);

export const {
    setQuestions,
    cleanQuestions,
    setActive,
    clearQuestionsLogout,
    setPendingShelters,
    setPendingQuestionsCount
} = questionSlice.actions;

