import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

/* Singleton implementation using slices */

// check if user is authenticated

export const getAuthStatus = () => async (dispatch) => {
    try {
        const isAuth = await axios.get('http://localhost:8080/api/getAuth', { withCredentials: true })

        if (isAuth.data.isSignedIn) {
            dispatch(getUserAuth(true))
        }

        else {
            dispatch(getUserAuth(false))
        }
    }
    catch (error) {
        dispatch(getUserAuth(false))
    }
}



const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        fullName: "",
        profileIcon: ""
    },

    reducers: {
        getUserAuth: (state, action) => {
            state.isAuthenticated = action.payload
        },

        signOut: state => {
            state.isAuthenticated = false
        },

        signIn: state => {
            state.isAuthenticated = true
        },

        setFullName: (state, action) => {
            state.isAuthenticated = false
        }
    }

})

export const { getUserAuth, signOut, signIn, setFullName } = userSlice.actions
export default userSlice.reducer