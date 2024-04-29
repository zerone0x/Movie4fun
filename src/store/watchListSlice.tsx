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
      if (state.value.some((movie: WatchListItemProp) => movie.id === action.payload.id)) {
        return
      }
      state.value.push(action.payload)
    },
    removeWatchList(state: ReduceStateWatchProp, action) {
      state.value = state.value.filter(
        (movie) => movie.id !== action.payload.id
      )
    },
    // Sort by diff properties of the movie
    sortWatchList(state:ReduceStateWatchProp, action) {
      if (action.payload === 'title') {
        state.value.sort((a, b) => a.title.localeCompare(b.title))
      }
      if (action.payload === 'rating') {
        state.value.sort((a, b) => b.vote_average - a.vote_average)
      }
      if (action.payload === 'release') {
        
        state.value.sort((a, b) => 
          {
            const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB.getTime() - dateA.getTime();
          }
      )
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
      setCurrentPage:(state, action) => {
        state.currentPage = action.payload
      }
      


  },
})

interface ReduceStateWatchProp{
  value:WatchListItemProp[]

}

interface WatchListItemProp{
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  original_title: string;
  poster_path: string;
  overview: string;
  runtime: number;
  genres: {name:string}[];

}

interface State {
  watchList:{
    value:WatchListItemProp[]
    currentPage: number
    moviesPerPage: number
  }
}

export const { nextPage, prevPage, setCurrentPage, setWatchList, addWatchList, removeWatchList, reverseWatchList, sortWatchList} =
  watchListSlice.actions
export const selectWatchList = (state: State) => state.watchList.value
export const selectAllWatchList = (state: State) => state.watchList
export const selectWatchListCount = (state: State) => state.watchList.value.length
export default watchListSlice.reducer
