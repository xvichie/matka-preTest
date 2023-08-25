import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    GlobalTheme: 'light'
}


const globalSettingsSlice = createSlice({
    name: 'globalSettings',
    initialState: initialState,
    reducers: {
        setGlobalTheme: (state, action) => {
            state.GlobalTheme = action.payload;
        }
    },
});

export const { setGlobalTheme } = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;