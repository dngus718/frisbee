import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
    name: '로그인_데이터',
    initialState: {
        userId: '',
        exp: ''
    },
    reducers: {
        setLoginAction(state, action){
            state.userId = action.payload.userId;
            state.exp = action.payload.exp;
        }
    }
});

export default login.reducer;
export const {setLoginAction} = login.actions;