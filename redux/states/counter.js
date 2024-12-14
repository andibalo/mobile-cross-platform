import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        add: (state) => {
            state.count += 1;
        },
        reduce: (state) => {
            if(state.count != 0)
                state.count -= 1;
        },
        set: (state, action) => {
            if(action.payload >= 0)
                state.count = action.payload;
        }
    }
});

export const { add, reduce, set } = counterSlice.actions;

export const selectCount = (state) => state.counter.count;

export default counterSlice.reducer;