import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { rails } from "../App";

type Chats = {
    id: number,
    user_id: number,
    room_id: number,
    body: string,
    created_at: string,
    updated_at: string
};

const chatsReducer = createEntityAdapter<Chats>({
    selectId: chat => chat.id,
    sortComparer: (a, b) => b.created_at.localeCompare(a.created_at)
});

export const getRoomChats = createAsyncThunk(
    'chats/getRoomChats',
    async(id: number) => {
        const response = await rails.get(`chats/${id}`)
        return response.data
    }
);

const chatsSlice = createSlice({
    name: 'chats',
    initialState: chatsReducer.getInitialState({status: 'idle'}),
    reducers: {
        createChat: (state, action) => {
            chatsReducer.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomChats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRoomChats.fulfilled, (state, action) => {
                chatsReducer.upsertMany(state, action.payload);
                state.status = 'successed';
            })
            .addCase(getRoomChats.rejected, (state) => {
                state.status = 'error';
            })
    }
});

export const {
    selectAll: selectAllChats,
    selectById: selectChatById
} = chatsReducer.getSelectors((state: any) => state.chats);
export const {createChat} = chatsSlice.actions;
export default chatsSlice.reducer;
