import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { rails } from "../App";

export type Room = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
};

const roomsAdapter = createEntityAdapter<Room>({
    selectId: room => room.id,
    sortComparer: (a, b) => b.created_at.localeCompare(a.created_at)
});

export const getRooms = createAsyncThunk(
    'rooms/getRooms',
    async() => {
        const response = await rails.get('rooms/index')
        return response.data
    }
);

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: roomsAdapter.getInitialState({status: 'idle'}),
    reducers: {
        createRoom: (state, action) => {
            roomsAdapter.addOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                roomsAdapter.setAll(state, action.payload);
                state.status = 'successed';
            })
            .addCase(getRooms.rejected, (state) => {
                state.status = 'error';
            })
    }
});

export const {
    selectAll: selectAllRooms,
    selectById: selectRoomById,
} = roomsAdapter.getSelectors((state: any) => state.rooms);
export const {createRoom} = roomsSlice.actions;
export default roomsSlice.reducer;
