import { combineReducers } from "redux"
import userSlice from "../reducers/user/userSlice.js"
import shoppingCartSlice from "../reducers/shoppingCart/shoppingCartSlice.js"
import blurSlice from "../reducers/blur/blurSlice.js"

const rootReducer = combineReducers({
    user: userSlice,
    shoppingCart: shoppingCartSlice,
    blur: blurSlice
})

export default rootReducer