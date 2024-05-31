import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/* Singleton implementation using slices */

// Get shopping cart from database session

export const dbGetShoppingCart = () => async (dispatch) => {

    try {

        const shoppingCart = await axios.get('https://housoku-server-8d1399a4e220.herokuapp.com/api/getShoppingCart', { withCredentials: true })
        const productDetails = shoppingCart.data

        // calculate current subtotal

        let subTotal = 0;
        let count = 0;
        productDetails.forEach((item, ind) => {
            subTotal += (Number(item.price) * item.quantity)
            count += 1
        })

        // update state
        dispatch(setSubTotal(subTotal))
        dispatch(setShoppingCartCount(count))
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
        const addedProduct = await axios.post('https://housoku-server-8d1399a4e220.herokuapp.com/api/addProductToShoppingCart', product,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                withCredentials: true
            })

        // 201 = Product was added (Resource created)

        if (addedProduct.status === 201) {

            const productDetails = addedProduct.data
            dispatch(addProduct(productDetails))
        }

        // 200 = Request OK, but Product has already been added. The quantity of the product was increased by 1 instead

        if (addedProduct.status === 200) {
            const productInd = addedProduct.data.productIndex
            dispatch(increaseQuantity(productInd))
        }
    }
    catch (error) {
        return error
    }
}
export const dbUpdateProductQuantity = (prodIndex, newQuantity) => async (dispatch) => {
    try {

        const updateProductQty = await axios.post(`https://housoku-server-8d1399a4e220.herokuapp.com/api/updateProductQuantityInShoppingCart`, { productIndex: prodIndex, quantity: newQuantity }, { withCredentials: true })

        if (updateProductQty.status === 200) {
            dispatch(updateProductQuantity(updateProductQty.data))
        }


    }
    catch (error) {
        return error
    }
}

export const dbUpdateProductSize = (prodIndex, prodId, newSize) => async (dispatch) => {
    try {

        const updateProductSize = await axios.post(`https://housoku-server-8d1399a4e220.herokuapp.com/api/updateProductSizeInShoppingCart`, { productIndex: prodIndex, productId: prodId, size: newSize }, { withCredentials: true })

        if (updateProductSize.status === 200) {
            dispatch(updateProductSize(updateProductSize.data))
        }


    }
    catch (error) {
        return error
    }
}


export const dbRemoveProduct = (productIndex) => async (dispatch) => {
    try {
        const removedProduct = await axios.delete(`https://housoku-server-8d1399a4e220.herokuapp.com/api/removeProductFromShoppingCart/${productIndex}`, { withCredentials: true })

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

        setShoppingCartCount: (state, action) => {
            state.shoppingCartCount = action.payload
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
            state.shoppingCartCount -= 1
        },

        increaseQuantity: (state, action) => {
            const productInd = action.payload
            if (state.items[productInd].quantity < 10)
                state.items[productInd].quantity += 1
        },

        decreaseQuantity: (state, action) => {
            const productInd = action.payload
            if (state.items[productInd].quantity > 0)
                state.items[productInd].quantity -= 1
        },

        updateProductQuantity: (state, action) => {
            const productInd = action.payload.productIndex
            const productQty = action.payload.quantity
            if (productQty <= 10)
                state.items[productInd].quantity = productQty
        },

        updateProductSize: (state, action) => {
            const productInd = action.payload.productIndex
            const productSize = action.payload.size
            state.items[productInd].size = productSize
        }
    }
})

export const { getShoppingCart, setShoppingCartCount, setSubTotal, addProduct, removeProduct, increaseQuantity, decreaseQuantity, updateProductQuantity } = shoppingCartSlice.actions
export default shoppingCartSlice.reducer

