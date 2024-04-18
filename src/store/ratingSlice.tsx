import { createSlice } from "@reduxjs/toolkit"

const initialState={
    value:[],
}

const ratingSlice = createSlice({
    name:"rating",
    initialState,
    reducers:{
        setRating(state, action){
            const {rate, imdbID} = action.payload;
            const index = state.value.findIndex((item) => item.imdbID === imdbID);
            if(index !== -1){
                console.log(state.value[index] )
                console.log(action.payload)
                state.value[index].rate = rate
            }else{
                if(rate >0){
                    state.value.push(action.payload)
                }
                
            }
        }
    }
})


export const {setRating} = ratingSlice.actions
export const selectRating = (state) => state.rating.value
export default ratingSlice.reducer;
