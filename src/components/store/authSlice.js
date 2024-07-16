import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    userData: {},
    cart: [], // contains arrays like : [itemName, itemId, userId, price, img]
    purchasedItems: [] // contains arrays like : [itemName, itemId, userId, date, false, price]
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.active = true,
            state.userData = action.payload
            // sessionStorage.setItem('cart', Array.toString(cart))
            // sessionStorage.setItem('purchasedItems', Array.toString(purchasedItems))
            // sessionStorage.setItem('userData', JSON.stringify(userData))
            // state.cart.push(authService.)
        },
        logout: (state) => {
            state.active = false,
            state.userData = {}
            state.cart = []
            state.purchasedItems = []
            // sessionStorage.clear()
        },
        addToCart: (state, action) => {
            console.log(action.payload)
            state.cart.push(action.payload)
            // sessionStorage.setItem('cart', Array.toString(cart))
        },
        purchaseItem: (state, action) => {
            state.purchasedItems.push(action.payload)
            // sessionStorage.setItem('purchasedItems', Array.toString(purchasedItems))
        },
        removeFromCart: (state, action) => {
            // console.log("item[1] : ", item[1])
            // console.log("action.payload : ", action.payload)
            const newCart = []
            state.cart.filter((item) => {
                console.log("item[1] : ", item[1])
                item[1] !== action.payload.itemId
                if (item[1] === action.payload.itemId) {
                    console.log("Found to be removed")
                } else {
                    newCart.push(item)
                }
            })
            state.cart = newCart
            // sessionStorage.setItem('cart', Array.toString(cart))
        },
    }
})

export const { login, logout, addToCart, purchaseItem, removeFromCart } = authSlice.actions

export default authSlice.reducer