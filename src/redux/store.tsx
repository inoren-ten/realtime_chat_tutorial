import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './currentUserSlice'
import roomsReducer from './roomsSlice'
import chatsReducer from './chatsSlice'

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        rooms: roomsReducer,
        chats: chatsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
