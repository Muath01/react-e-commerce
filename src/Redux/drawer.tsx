import { createSlice } from '@reduxjs/toolkit';



export const drawer = createSlice({
    name:"drawer", 
    initialState: {
        isOpen: false
    },
    reducers:{
        setDrawer: (state, action) => {
            state.isOpen = !state.isOpen;
        }
    }
})

export const {setDrawer} = drawer.actions;