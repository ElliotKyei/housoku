import { createSlice, current } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import axios from 'axios'

/* Singleton implementation using slices */

// Get shopping cart from database session

export const dbGetShoppingCart = () => async (dispatch) => {
    try {

        const shoppingCart = await axios.get('http://localhost:8080/api/getShoppingCart', { withCredentials: true })
        const productDetails = shoppingCart.data

        // calculate current subtotal

        let subTotal = 0;
        productDetails.forEach((item, ind) => {
            subTotal += (Number(item.price) * item.quantity)
        })

        // update state
        dispatch(setSubTotal(subTotal))
        dispatch(getShoppingCart(productDetails))

    }
    catch (error) {
        dispatch(getShoppingCart([]))
        return error
    }
}

// Get shopping cart from database session

export const dbAddProduct = (product) => async (dispatch) => {
    try {
        const addedProduct = await axios.post('http://localhost:8080/api/addProductToShoppingCart', product,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                withCredentials: true
            })

        if (addedProduct.status === 201) {

            const productDetails = addedProduct.data
            dispatch(addProduct(productDetails))
        }

        if (addedProduct.status === 200) {
            const productInd = addedProduct.data.productIndex
            dispatch(increaseQuantity(productInd))
        }
    }
    catch (error) {
        return error
    }
}

export const dbUpdateProductQuantity = (prodIndex, qty) => async (dispatch) => {
    try {

        const updateProductQty = await axios.put(`http://localhost:8080/api/removeProductFromShoppingCart/${prodIndex}/${qty}`, { withCredentials: true })

        if (updateProductQty.status === 200) {
            dispatch(updateProductQuantity(updateProductQty.data))
        }


    }
    catch (error) {
        return error
    }
}



export const dbRemoveProduct = (prodIndex) => async (dispatch) => {
    try {

        const removedProduct = await axios.delete(`http://localhost:8080/api/removeProductFromShoppingCart/${prodIndex}`, { withCredentials: true })

        if (removedProduct.status === 200) {
            dispatch(removeProduct(removedProduct.data.productIndex))
        }


    }
    catch (error) {
        return error
    }
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: {
        items: [],
        shoppingCartCount: 0,
        subTotal: 0
    },
    reducers: {

        getShoppingCart: (state, action) => {
            state.items = action.payload
            state.shoppingCartCount = action.payload.length
        },

        setSubTotal: (state, action) => {
            state.subTotal = (action.payload).toFixed(2)
        },

        addProduct: (state, action) => {
            const product = action.payload
            state.items.push(product)
            state.shoppingCartCount += 1
        },

        removeProduct: (state, action) => {
            const productInd = action.payload
            state.items.splice(productInd, 1)
        },

        increaseQuantity: (state, action) => {
            const productInd = action.payload
            state.items[productInd].quantity += 1
        },

        decreaseQuantity: (state, action) => {
            const productInd = action.payload
            state.items[productInd].quantity -= 1
        },

        updateProductQuantity: (state, action) => {
            const productInd = action.payload.productIndex
            const productQty = action.payload.quantity
            state.items[productInd].quantity = productQty
        }
    }
})

export const { getShoppingCart, setSubTotal, addProduct, removeProduct, increaseQuantity, decreaseQuantity, updateProductQuantity } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer

