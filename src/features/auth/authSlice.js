import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    isLogged: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload)
            state.username = action.payload.username
            state.isLogged = true
        },
        removeUser: (state) => {
            state.nombre = null
            state.isLogged = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer

// current user
export const selectUser = (state) => state.auth?.username
export const isLogged = (state) => state.auth.isLogged
