import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name:'장바구니',
    initialState: {
        장바구니:[]
    },
    reducers:{
        cartAction(state,action){
            state.장바구니 = action.payload.장바구니;
        }
    }
});

export default cart.reducer;
export const {cartAction} = cart.actions;