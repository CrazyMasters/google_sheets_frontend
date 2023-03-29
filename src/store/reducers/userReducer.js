import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userData: {}
}


const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem("userEmail", action.payload.email)
            return {...state, userData: action.payload}
        }
    },
})


export const {setUser} = userReducer.actions

export default userReducer.reducer