import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload.product

            const existingProduct = state.find((item) => item.id === product.id)
            if (existingProduct) {
                existingProduct.quantity += 1
            } else {
                state.push({
                    ...product,
                    quantity: 1
                })
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.find((p) => p.id === action.payload.id)
            if (item) {
                item.quantity ++ 
            }
        },
        decreaseQuantity:(state, action)=>{
            const item = state.find((p)=> p.id === action.payload.id)
            if(item && item.quantity > 1){
                item.quantity--
            }
        }
    }
})
export const {addProduct, increaseQuantity, decreaseQuantity} = cartSlice.actions
export default cartSlice.reducer