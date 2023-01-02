import { createSlice } from '@reduxjs/toolkit';

type InitialState =  {
    isOpen: Boolean,
    shoppingCartItems: any[],
}

const initialState: InitialState = {
    isOpen: false, 
    shoppingCartItems: [],
}

export const drawer = createSlice({
    name:"drawer", 
    initialState,
    reducers:{
        setDrawer: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        addToCart:(state, action) => {
            state.shoppingCartItems.push(action.payload)
        },
    }
})

export const {setDrawer, addToCart} = drawer.actions;