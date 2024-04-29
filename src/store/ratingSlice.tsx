import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setRating(state: RatingReduceProp, action) {
      const { rate, id } = action.payload
      const index = state.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.value[index].rate = rate
      } else {
        if (rate > 0) {
          state.value.push(action.payload)
        }
      }
    },
  },
})

interface RatingReduceProp {
  value: RatingProp[]
}
interface RatingProp {
  rate: number
  id: number
}
interface State {
  rating: {
    value: RatingProp[]
  }
}
export const { setRating } = ratingSlice.actions
export const selectRating = (state: State) => state.rating.value
export default ratingSlice.reducer
