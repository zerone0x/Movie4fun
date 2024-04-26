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
    sortWatchList(state, action) {
      if (action.payload === 'title') {
        state.value.sort((a, b) => a.title.localeCompare(b.title))
      }
      if (action.payload === 'rating') {
        state.value.sort((a, b) => b.vote_average - a.vote_average)
      }
      if (action.payload === 'release') {
        state.value.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      }
    },
    reverseWatchList(state) {
      state.value.reverse()
    },


  },
})

interface State {
  watchList:{
    value:[]
  }
}

export const { setWatchList, addWatchList, removeWatchList, reverseWatchList, sortWatchList} =
  watchListSlice.actions
export const selectWatchList = (state: State) => state.watchList.value
export const selectWatchListCount = (state: State) => state.watchList.value.length
export default watchListSlice.reducer
