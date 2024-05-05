import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  currentPage: 1,
  moviesPerPage: 10,
}

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    setWatchList(state, action) {
      state.value = action.payload
    },
    addWatchList(state: ReduceStateWatchProp, action) {
      if (
        state.value.some(
          (movie: WatchListItemProp) => movie.id === action.payload.id && movie.backdrop_path === action.payload.backdrop_path
        )
      ) {
        return
      }
      state.value.push(action.payload)
    },
    removeWatchList(state: ReduceStateWatchProp, action) {
      state.value = state.value.filter(
        (movie) => !(movie.id === action.payload.id && movie.backdrop_path === action.payload.backdrop_path)
      )
    },
    // Sort by diff properties of the movie
    sortWatchList(state: ReduceStateWatchProp, action) {
      if (action.payload === 'title') {
        state.value.sort((a, b) => {
          const titleA = a.original_title || a.original_name || '';
          const titleB = b.original_title || b.original_name || '';
          return titleA.localeCompare(titleB);
        });
      }
      if (action.payload === 'rating') {
        state.value.sort((a, b) => b.vote_average - a.vote_average);
      }
      if (action.payload === 'release') {
        state.value.sort((a, b) => {
          const dateA = new Date(a.release_date || a.first_air_date || '');
          const dateB = new Date(b.release_date || b.first_air_date || '');
          return dateB.getTime() - dateA.getTime();
        });
      }
    },

    reverseWatchList(state) {
      state.value.reverse()
    },

    // page split
    nextPage: (state) => {
      state.currentPage += 1
    },

    prevPage: (state) => {
      state.currentPage -= 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

interface ReduceStateWatchProp {
  value: WatchListItemProp[]
}

interface WatchListItemProp {
  id: number
  genres: { name: string }[]
  poster_path: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}

interface State {
  watchList: {
    value: WatchListItemProp[]
    currentPage: number
    moviesPerPage: number
  }
}

export const {
  nextPage,
  prevPage,
  setCurrentPage,
  setWatchList,
  addWatchList,
  removeWatchList,
  reverseWatchList,
  sortWatchList,
} = watchListSlice.actions
export const selectWatchList = (state: State) => state.watchList.value
export const selectAllWatchList = (state: State) => state.watchList
export const selectWatchListCount = (state: State) =>
  state.watchList.value.length
export default watchListSlice.reducer
