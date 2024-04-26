import { configureStore } from '@reduxjs/toolkit'
import userSlice from './sclices/userSclice'

export const Store = configureStore({
    reducer: {
        user: userSlice,
    },
})