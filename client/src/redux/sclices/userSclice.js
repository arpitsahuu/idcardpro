import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null,
        schools: null,
        students: [],
        staffs:[],
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.error = null,
                state.isAuthenticated = action.payload;
        },
        setLoading: (state, action) => {
            state.error = null,
                state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = null
            state.error = action.payload
        },
        setUser: (state, action) => {
            state.error = null
            state.user = action.payload
            console.log(action.payload)
        },
        setSchools: (state, action) => {
            state.error = null
            state.schools = action.payload
        },
        setStudents: (state, action) => {
            state.error = null
            state.students = action.payload
        },
        setStaff: (state, action) => {
            state.error = null
            state.staffs = action.payload
        },
    },
});

export const {
    setIsAuthenticated,
    setLoading,
    setError,
    setUser,
    setSchools,
    setStudents,
    setStaff,
} = userSlice.actions;

export default userSlice.reducer;
