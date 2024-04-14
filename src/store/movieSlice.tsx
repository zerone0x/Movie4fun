import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers:{
        set(state, action){
            state.value = action.payload
        }
    }
})

export const { set } = movieSlice.actions
export const selectMovie = (state) => state.movie.value

export default movieSlice.reducer;