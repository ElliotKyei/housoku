import { createSlice } from "@reduxjs/toolkit";

function getAuthStatus() {
    const item = localStorage.getItem('user')

    if (item !== null) {
        const user = localStorage.getItem('user')
        const { isSignedIn } = JSON.parse(user)

        if (!isSignedIn)
            return false
        else
            return true
    }
    else {
        return false
    }

}

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: getAuthStatus(),
        fullName: "",
        profileIcon: ""
    },

    reducers: {
        signOut: state => {
            return { ...state, isAuthenticated: false };
        },

        signIn: state => {
            return { ...state, isAuthenticated: true };
        },

        setFullName: (state, action) => {
            return { ...state, isAuthenticated: false };
        }
    }

})

export const { signOut, signIn, setFullName } = userSlice.actions
export default userSlice.reducer