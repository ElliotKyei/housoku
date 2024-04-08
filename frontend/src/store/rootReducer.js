import { combineReducers } from "redux"
import userSlice from "../reducers/user/userSlice.js"

const rootReducer = combineReducers({
    user: userSlice
})

export default rootReducer