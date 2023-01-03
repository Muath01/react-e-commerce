import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
    isOpen: Boolean,
    shoppingCartItems: string[],
}

const initialState: InitialState = {
    isOpen: false,
    shoppingCartItems: [],
}

export const drawer = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        addToCart: (state: InitialState, action: PayloadAction<string>) => {
            state.shoppingCartItems.push(action.payload)
        },
    }
})

export const { setDrawer, addToCart } = drawer.actions;