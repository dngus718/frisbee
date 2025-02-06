import { createSlice } from "@reduxjs/toolkit";

const modalState = createSlice({
    name: '모달 상태관리',
    initialState: {
        isModal: false
    },
    reducers: {
        modalOpenAction: (state, action)=>{
            state.isModal = action.payload  /* .modal */; // action:수정할때, payload:매개체(true, false)
        },
        modalCloseAction: (state, action)=>{
            state.isModal = action.payload;
        }
    }
});

export default modalState.reducer;
export const {modalOpenAction, modalCloseAction} = modalState.actions;