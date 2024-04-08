import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import userSlice from '../reducers/user/userSlice'

const store = configureStore({
    reducer: rootReducer
})

export default store