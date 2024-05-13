import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

/* SINGLETON Utilizing a global state variable to store user data / session - See reducer folder for implementation */

const store = configureStore({
    reducer: rootReducer
})

export default store