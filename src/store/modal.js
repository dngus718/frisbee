import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
    name: 'modal',
    initialState: {
        mainModal: true,
        topModal: true
    },
    reducers: {
        mainModalAction(state, action){
            state.mainModal = action.payload
        },
        topModalAction(state, action){
            state.topModal = action.payload
        }
    }
});

export default modal.reducer;

export const {mainModalAction, topModalAction} = modal.actions;



