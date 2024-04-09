import { createSlice, createAsyncthunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    messge: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer