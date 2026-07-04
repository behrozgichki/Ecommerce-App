import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../reducers/CartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})
export default store 