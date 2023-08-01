import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js';
import testReducer from './slices/TestSlice.js';
import userTestsReducer from './slices/userTestsSlice.js'; // Make sure to import the userTestsReducer

export const store = configureStore({
    reducer: {
        auth: authReducer,
        test: testReducer,
        userTests: userTestsReducer
    },
})