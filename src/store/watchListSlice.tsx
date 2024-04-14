import { createSlice } from "@reduxjs/toolkit"
import WatchList from "../pages/WatchList"


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
            if (state.value.some((movie) => movie.imdbID === action.payload.imdbID)){
                return
            }
            state.value.push(action.payload)
        },
        removeWatchList(state,action){
            state.value = state.value.filter((movie)=> movie.imdbID !== action.payload.imdbID)
        }
    }
})

export const {setWatchList, addWatchList, removeWatchList} = watchListSlice.actions
export const selectWatchList = (state) => state.watchList.value
export const selectWatchListCount = (state) => state.watchList.value.length
export default watchListSlice.reducer;