import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.value = action.payload
    },
  },
})

export const { setQuery } = querySlice.actions
export const selectQuery = (state) => state.query.value

export default querySlice.reducer
