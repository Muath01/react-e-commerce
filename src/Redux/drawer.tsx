import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { clearScreenDown } from 'readline';

type InitialState = {
    isOpen: boolean;
    shoppingCartItems: {
      [product: string]: {
        quantity: number;
        price?: number;
      }
    };
  }

const initialState: InitialState = {
    isOpen: false,
    shoppingCartItems: {}
}

export const drawer = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setDrawer: (state, action) => {
            state.isOpen = !state.isOpen;
        },
        addToCart: (state: InitialState, action: PayloadAction<Object>) => {
            const item = action.payload;

            const newUser =  {...state.shoppingCartItems}

            console.log("item", action)

            newUser[item["productName"]] = {
                quantity: item["quantity"],
                // price:item["price"]
            }

            
                state.shoppingCartItems = newUser
                console.log(newUser)



        },

        removeFromCart: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            delete state.shoppingCartItems[item];
        },
        incrementItem: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            state.shoppingCartItems[item]["quantity"] += 1
        },
        decrementItem: (state: InitialState, action: PayloadAction<string>) => {
            let item = action.payload;
            const newUser = {...state.shoppingCartItems}

            newUser[item].quantity -= 1;

            state.shoppingCartItems = newUser

        },
        changePrice:(state:InitialState, action?: PayloadAction<Object>) => {

            let item = action.payload;
            let price = item["price"]

            
            const newUser = {...state.shoppingCartItems}
            
            console.log(newUser[item["productName"]].quantity)
            let quantity = newUser[item["productName"]].quantity;

            let newPrice = parseFloat((price * quantity).toFixed(2).padEnd(3, "0"))
            
            newUser[item["productName"]]["price"] =  newPrice;


            state.shoppingCartItems = newUser;
        }
    }
})

export const { setDrawer, addToCart, removeFromCart, incrementItem, decrementItem, changePrice } = drawer.actions;