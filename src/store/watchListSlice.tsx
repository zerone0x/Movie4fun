import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    setWatchList(state, action) {
      state.value = action.payload
    },
    addWatchList(state, action) {
      if (state.value.some((movie) => movie.id === action.payload.id)) {
        return
      }
      state.value.push(action.payload)
    },
    removeWatchList(state, action) {
      state.value = state.value.filter(
        (movie) => movie.id !== action.payload.id
      )
    },
  },
})

export const { setWatchList, addWatchList, removeWatchList } =
  watchListSlice.actions
export const selectWatchList = (state) => state.watchList.value
export const selectWatchListCount = (state) => state.watchList.value.length
export default watchListSlice.reducer
