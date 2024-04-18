import { createSlice } from "@reduxjs/toolkit"

const initialState={
    value:0,
}

const ratingSlice = createSlice({
    name:"rating",
    initialState,
    reducers:{
        setRating(state, action){
            state.value = action.payload
        }
    }
})


export const {setRating} = ratingSlice.actions
export const selectRating = (state) => state.rating.value
export default ratingSlice.reducer;
