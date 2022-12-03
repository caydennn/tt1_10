import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated:false,
    currentUser: null,        
};

export const userSlice = createSlice({
    name: 'user',
    initialState,    
    reducers: {
        login: (state ,action)=> {
            state.isAuthenticated = true
            state.currentUser = action.payload
        },
        logout: state => {
            state.isAuthenticated = false
            state.currentUser = null            
        },
    }
})

export const { login,logout } = userReducer.actions

export default userSlice.reducer