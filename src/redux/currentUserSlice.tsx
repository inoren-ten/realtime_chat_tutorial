import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: null,
    reducers: {
        setCurrentUser: (state, action) => {
            return action.payload
        },
        logout: () => {
            return null
        }
    }
});

export const {setCurrentUser, logout} = currentUserSlice.actions;
export default currentUserSlice.reducer;
