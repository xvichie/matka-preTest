import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    problems: [],
    similars: [],
    answers: [],
    chosenAnswers: Array.from({ length: 41 }, () => ""),
    score: 0,
    time: 0,
    componentOrder: 'Start',
    testHasStarted: false,
    testType: ''
}


const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        setProblems: (state, action) => {
            state.problems = action.payload;
        },
        setSimilars: (state, action) => {
            state.similars = action.payload;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        },
        setChosenAnswers: (state, action) => {
            state.chosenAnswers = action.payload;
        },
        setScore: (state, action) => {
            state.score = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setComponentOrder: (state, action) => {
            state.componentOrder = action.payload;
        },
        resetChosenAnswers: (state, action) => {
            state.chosenAnswers = initialState.chosenAnswers;
        },
        setTestHasStarted: (state, action) => {
            state.testHasStarted = action.payload;
        },
        setTestType: (state, action) => {
            state.testType = action.payload;
        }
    },
});

export const { setProblems, setSimilars, setAnswers, setChosenAnswers, setScore, setTime, setComponentOrder, resetChosenAnswers, setTestHasStarted, setTestType } = testSlice.actions;

export default testSlice.reducer;