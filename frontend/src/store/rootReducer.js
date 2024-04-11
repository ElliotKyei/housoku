import { combineReducers } from "redux"
import userSlice from "../reducers/user/userSlice.js"
import shoppingCartSlice from "../reducers/shoppingCart/shoppingCartSlice.js"

const rootReducer = combineReducers({
    user: userSlice,
    shoppingCart: shoppingCartSlice
})

export default rootReducer