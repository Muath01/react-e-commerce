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

            const newProduct = {...state.shoppingCartItems}

            // Created a new object of the nested object to avoid mutating the original object, In JS, when you copy a nested object, 
            // js will make a refrence to those nested objects, because they're not primitive types, and so if you make a refrence to an object
            // then mutate it, you'll be mutating the original state. To avoid this, I made another copy of the nested object. 
            const newUser =  {...state.shoppingCartItems.product, quantity: item["quantity"], price: item["price"]}

            newProduct[item["productName"]] = {
                quantity: newUser.quantity, 
                price: newUser.price
            }
            
            
            state.shoppingCartItems = newProduct



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

            if(state.shoppingCartItems[item["productName"]]){

                const newUser = {...state.shoppingCartItems}
                let quantity = newUser[item["productName"]].quantity;
    
                let newPrice = parseFloat((price * quantity).toFixed(2).padEnd(3, "0"))
                
                newUser[item["productName"]]["price"] =  newPrice;
    
    
                state.shoppingCartItems = newUser;
            }
            
        }
    }
})

export const { setDrawer, addToCart, removeFromCart, incrementItem, decrementItem, changePrice } = drawer.actions;