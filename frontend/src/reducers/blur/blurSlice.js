import { createSlice } from "@reduxjs/toolkit";

const blurSlice = createSlice({
    name: "blur",
    initialState: {
        blurSetting: false
    },

    reducers: {
        setBlur: (state, action) => {
            const blur = action.payload
            state.blurSetting = blur
        }
    }
})

export default blurSlice.reducer
export const { setBlur } = blurSlice.actions