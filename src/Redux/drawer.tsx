import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
    isOpen: Boolean,
    shoppingCartItems: {
        [product:string]:number
    },
}

const initialState: InitialState = {
    isOpen: false,
    shoppingCartItems: {},
}

export const drawer = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        addToCart: (state: InitialState, action: PayloadAction<string>) => {
            const product = action.payload;
            state.shoppingCartItems[product] = 1 
        },
        removeFromCart: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            delete state.shoppingCartItems[item];
        },
        incrementItem: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            state.shoppingCartItems[item] += 1
        },
        decrementItem: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            state.shoppingCartItems[item] -= 1
        }
    }
})

export const { setDrawer, addToCart, removeFromCart, incrementItem, decrementItem } = drawer.actions;