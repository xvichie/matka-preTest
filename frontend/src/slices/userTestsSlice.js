import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const userTestsSlice = createSlice({
    name: 'userTests',
    initialState: {
        tests: []
    },
    reducers: {
        setTests: (state, action) => {
            state.tests = action.payload;
        },
    },
});

export const { setTests } = userTestsSlice.actions;

export default userTestsSlice.reducer;