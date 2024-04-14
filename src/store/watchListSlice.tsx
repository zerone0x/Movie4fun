import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: []
}

const watchListSlice = createSlice({
    name:"watchList",
    initialState,
    reducers:{
        setWatchList(state, action){
            state.value = action.payload
        },
        addWatchList(state, action){
            state.value.push(action.payload)
        },
        removeWatchList(state,action){
            state.value = state.value.filter((movie)=> movie.imdbID !== action.payload.imdbID)
        }
    }
})


export const {setWatchList, addWatchList, removeWatchList} = watchListSlice.actions
export const selectWatchList = (state) => state.watchList.value

export default watchListSlice.reducer;