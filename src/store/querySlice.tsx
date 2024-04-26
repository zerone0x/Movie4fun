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

interface State {
  query:{
    value:string
  }
}

export const { setQuery } = querySlice.actions
export const selectQuery = (state: State) => state.query.value

export default querySlice.reducer
