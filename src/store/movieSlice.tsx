import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    set(state, action) {
      state.value = action.payload
    },
  },
})
interface State {
  movie: {
    value: []
  }
}
export const { set } = movieSlice.actions
export const selectMovie = (state: State) => state.movie.value

export default movieSlice.reducer
